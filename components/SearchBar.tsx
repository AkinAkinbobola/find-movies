"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { findMovie } from "@/app/actions/findMovie";
import MovieSearchCard from "@/components/MovieSearchCard";

const SearchBar = () => {
  const [input, setInput] = useState("Lord of the rings");
  const [movies, setMovies] = useState<Movie[]>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await findMovie(input);
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <div className={"flex-grow bg-white rounded-md relative cursor-pointer"}>
      <div className={"flex py-3 px-2 gap-2"}>
        <Search />
        <input
          type={"text"}
          className={"bg-white w-full outline-none"}
          placeholder={"Search FindMovies"}
          value={input}
          onChange={handleChange}
        />
      </div>

      <div
        className={
          "absolute mt-1 w-full overflow-y-auto no-scrollbar max-h-96 bg-gray rounded-md"
        }
      >
        <ul className={"text-white"}>
          {movies?.map((movie) => {
            return (
              <MovieSearchCard
                key={movie.id}
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                date={movie.release_date}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
