"use client";

import { useEffect, useState } from "react";
import { getPopular } from "@/app/actions/getPopular";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPopular("movie");
      setMovies(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section>
      {!loading ? (
        <div className={"flex overflow-y-auto no-scrollbar gap-5"}>
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                score={movie.vote_average}
              />
            );
          })}
        </div>
      ) : (
        <div className={"flex overflow-y-auto no-scrollbar gap-5"}>
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <div className={"flex flex-col gap-2"} key={i}>
                <Skeleton className={"w-[180px] h-[250px]"} />
                <Skeleton className={"w-[80px] h-[10px] mx-auto"} />
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedMovies;
