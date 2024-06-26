"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { useInView } from "react-intersection-observer";
import { getUpcoming } from "@/app/actions/getUpcoming";
import { Movie } from "@/types";
import SkeletonMovieCard from "@/components/SkeletonMovieCard";

const Upcoming = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const loadMoreMovies = async () => {
    const next = page + 1;
    const movies: Movie[] = await getUpcoming(next);
    if (movies?.length) {
      setPage(next);
      setMovies((prev) => [...(prev?.length ? prev : []), ...movies]);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getUpcoming();
      setMovies(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section>
      {!loading ? (
        <>
          <div
            className={"flex items-center overflow-y-auto no-scrollbar gap-5"}
          >
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  score={movie.vote_average}
                  id={movie.id}
                  type={"movie"}
                />
              );
            })}
            <div ref={ref} />
          </div>
        </>
      ) : (
        <SkeletonMovieCard />
      )}
    </section>
  );
};

export default Upcoming;
