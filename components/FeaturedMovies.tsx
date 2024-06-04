"use client";

import { useEffect, useState } from "react";
import { getPopular } from "@/app/actions/getPopular";
import MovieCard from "@/components/MovieCard";

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
      {!loading && (
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
      )}
    </section>
  );
};

export default FeaturedMovies;
