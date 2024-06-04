"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { findMovie } from "@/app/actions/findMovie";
import MovieSearchCard from "@/components/MovieSearchCard";
import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedInput] = useDebounce(input, 1000);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedInput) {
        setLoading(true);
        const data = await findMovie(debouncedInput);
        setMovies(data);
        setLoading(false);
      } else {
        setMovies([]);
      }
    };
    fetchData();
  }, [debouncedInput]);

  return (
    <div className={`flex-grow bg-white rounded-md relative cursor-pointer`}>
      <div className={"flex py-3 px-2 gap-2"}>
        <Search />
        <input
          type={"text"}
          className={"bg-white w-full outline-none"}
          placeholder={"Search FindMovies"}
          value={input}
          onChange={handleChange}
          onFocus={() => setShowDropDown(true)}
          onBlur={() => setShowDropDown(false)}
        />
      </div>

      {showDropDown && (
        <div
          className={
            "absolute mt-1 w-full overflow-y-auto no-scrollbar max-h-96 bg-gray rounded-md"
          }
        >
          <ul className={"text-white"}>
            {!loading ? (
              movies.length > 0 ? (
                movies?.map((movie) => {
                  return (
                    <MovieSearchCard
                      key={movie.id}
                      id={movie.id}
                      poster={movie.poster_path}
                      title={movie.title}
                      date={movie.release_date}
                    />
                  );
                })
              ) : (
                <div className={"py-3 px-2"}>No results found</div>
              )
            ) : (
              <div>
                {Array(10)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      className={"my-3 mx-2 flex gap-2 items-center"}
                      key={i}
                    >
                      <Skeleton className="w-[50px] h-[50px] rounded-md" />

                      <div className={"flex flex-col gap-3"}>
                        <Skeleton className="w-[100px] h-[10px] rounded-md" />
                        <Skeleton className="w-[40px] h-[10px] rounded-md" />
                        <Skeleton className="w-[400px] h-[10px] rounded-md" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
