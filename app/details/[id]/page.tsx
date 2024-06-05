"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDetails } from "@/app/actions/getDetails";
import { Genre, MovieDetails, TVDetails } from "@/types";
import moment from "moment";
import Banner from "@/components/Banner";

const DetailsPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = Number(pathname.split("/").pop());
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [tvDetails, setTvDetails] = useState<TVDetails>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getDetails(id, type!);
      if (type === "movie") {
        setMovieDetails(data);
      } else if (type === "tv") {
        setTvDetails(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const directors = () => {
    const directors = movieDetails?.credits.crew.filter(
      (dir) => dir.job === "Director",
    );
    const names = directors?.map((dir) => dir.name);
    return names?.join(", ");
  };
  const screenplay = () => {
    const screenplayMakers = movieDetails?.credits.crew.filter(
      (s) => s.job === "Screenplay",
    );
    const names = screenplayMakers?.map((s) => s.name);
    return names?.join(", ");
  };
  const stars = () => {
    const cast = movieDetails?.credits.cast.slice(0, 3).map((c) => c.name);
    return cast?.join(", ");
  };

  const countries = () => {
    const ctr = movieDetails?.production_countries;
    const ctrJoined = ctr?.map((c) => c.name);
    return ctrJoined?.join(", ");
  };

  const formatDate = () => {
    const date = movieDetails?.release_date;
    return moment(date).format("MMMM D, YYYY");
  };

  const Content = ({ type }: { type: string | null }) => {
    if (type === "tv") {
      const imageUrl = `https://image.tmdb.org/t/p/original${tvDetails?.poster_path}`;
      return (
        <div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://placehold.co/250x200.png?text=Image+Not\\nFound&font=Lato"
            }
            alt={`Poster`}
            width={250}
            height={200}
            className={"rounded-md object-cover"}
          />
        </div>
      );
    }

    if (type === "movie") {
      const imageUrl = `https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`;
      const dir = directors();
      const screens = screenplay();
      const cast = stars();
      const ctr = countries();
      const date = formatDate();
      return (
        <div className={"flex flex-col md:flex-row gap-5"}>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://placehold.co/300.png?text=Image+Not\\nFound&font=Lato"
            }
            alt={`Poster`}
            width={250}
            height={200}
            className={"rounded-md object-cover hidden md:inline-block"}
          />

          <div className={"flex flex-col justify-between"}>
            <div className={"flex gap-3 flex-wrap"}>
              {movieDetails?.genres.map((genre: Genre) => {
                return (
                  <div
                    className={"text-white bg-gray rounded-full py-2 px-3"}
                    key={genre.id}
                  >
                    {genre.name}
                  </div>
                );
              })}
            </div>

            <p className={"text-white"}>{movieDetails?.overview}</p>
            <p className={"text-gray-100"}>
              Director: <span className={"text-white"}>{dir}</span>
            </p>

            <p className={"text-gray-100"}>
              Screenplay: <span className={"text-white"}>{screens}</span>
            </p>

            <p className={"text-gray-100"}>
              Stars: <span className={"text-white"}>{cast}</span>
            </p>
            <p className={"text-gray-100"}>
              Countries of Origin: <span className={"text-white"}>{ctr}</span>
            </p>
            <p className={"text-gray-100"}>
              Release Date: <span className={"text-white"}>{date}</span>
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <main>
      <div className={"bg-gray w-full py-20"}>
        <Banner
          type={type}
          tvDetails={tvDetails}
          movieDetails={movieDetails}
          loading={loading}
        />
      </div>
      <div className={"container py-4"}>
        <Content type={type} />
      </div>
    </main>
  );
};

export default DetailsPage;
