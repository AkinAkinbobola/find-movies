"use client";

import { useEffect, useState } from "react";
import { getPopular } from "@/app/actions/getPopular";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";

const FeaturedSeries = () => {
  const [movies, setMovies] = useState<TV[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const loadMoreMovies = async () => {
    const next = page + 1;
    const movies: TV[] = await getPopular("tv", next);
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
      const data = await getPopular("tv");
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
                title={movie.original_name}
                poster={movie.poster_path}
                score={movie.vote_average}
              />
            );
          })}
          <div ref={ref}>
            <span className="sr-only">Loading...</span>
          </div>
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

export default FeaturedSeries;
