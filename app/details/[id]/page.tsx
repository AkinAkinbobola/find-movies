"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDetails } from "@/app/actions/getDetails";
import { Genre, MovieDetails, TVDetails } from "@/types";
import Image from "next/image";
import moment from "moment";

const DetailsPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = Number(pathname.split("/").pop());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MovieDetails>();
  const [tvDetails, setTvDetails] = useState<TVDetails>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getDetails(id, type!);
      if (type === "movie") {
        setData(data);
      } else if (type === "tv") {
        setTvDetails(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  const formatYear = (date: string | undefined) => {
    return date?.split("-")[0];
  };

  const formatTime = (time: number | undefined) => {
    const hours = Math.floor(time! / 60);
    const minutes = time! % 60;
    return `${hours}h ${minutes}m`;
  };
  const directors = () => {
    const directors = data?.credits.crew.filter(
      (dir) => dir.job === "Director",
    );
    const names = directors?.map((dir) => dir.name);
    return names?.join(", ");
  };
  const screenplay = () => {
    const screenplayMakers = data?.credits.crew.filter(
      (s) => s.job === "Screenplay",
    );
    const names = screenplayMakers?.map((s) => s.name);
    return names?.join(", ");
  };
  const stars = () => {
    const cast = data?.credits.cast.slice(0, 3).map((c) => c.name);
    return cast?.join(", ");
  };

  const countries = () => {
    const ctr = data?.production_countries;
    const ctrJoined = ctr?.map((c) => c.name);
    return ctrJoined?.join(", ");
  };

  const formatDate = () => {
    const date = data?.release_date;
    return moment(date).format("MMMM D, YYYY");
  };

  const Banner = ({ type }: { type: string | null }) => {
    if (type === "tv") {
      return (
        <div className={"container flex gap-4 items-center justify-between"}>
          <div className={"flex flex-col items-start justify-center gap-3"}>
            {!loading && (
              <>
                <p className={"uppercase text-yellow text-3xl"}>{type}</p>
                <p className={"text-white uppercase text-3xl"}>
                  {tvDetails?.name}
                </p>

                <div className={"flex gap-2"}>
                  <p className={"text-white"}>
                    {formatYear(tvDetails?.first_air_date)}
                  </p>
                  <p className={"text-white"}>
                    {tvDetails?.number_of_seasons} season
                    {tvDetails?.number_of_seasons! > 1 && "s"}
                  </p>
                </div>
              </>
            )}
          </div>
          <div>
            {!loading && (
              <>
                <div className={"flex items-center gap-3"}>
                  <Image
                    src={"/icons/star-icon.svg"}
                    alt={"Ratings"}
                    width={40}
                    height={40}
                  />

                  <p className={"text-white text-3xl"}>
                    {tvDetails?.vote_average.toFixed(1)}
                  </p>
                  <p className={"text-gray-200 text-sm text-wrap"}>
                    {tvDetails?.vote_count} ratings
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
    if (type === "movie") {
      return (
        <div className={"container flex gap-4 items-center justify-between"}>
          <div className={"flex flex-col items-start justify-center gap-3"}>
            {!loading && (
              <>
                <p className={"uppercase text-yellow text-3xl"}>{type}</p>
                <p className={"text-white uppercase text-3xl"}>
                  {data?.original_title}
                </p>

                <div className={"flex gap-2"}>
                  <p className={"text-white"}>
                    {formatYear(data?.release_date)}
                  </p>
                  <p className={"text-white"}>{formatTime(data?.runtime)}</p>
                </div>
              </>
            )}
          </div>
          <div>
            {!loading && (
              <>
                <div className={"flex items-center gap-3"}>
                  <Image
                    src={"/icons/star-icon.svg"}
                    alt={"Ratings"}
                    width={40}
                    height={40}
                  />

                  <p className={"text-white text-3xl"}>
                    {data?.vote_average.toFixed(1)}
                  </p>
                  <p className={"text-gray-200 text-sm"}>
                    {data?.vote_count}
                    <br />
                    ratings
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
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
      const imageUrl = `https://image.tmdb.org/t/p/original${data?.poster_path}`;
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
              {data?.genres.map((genre: Genre) => {
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

            <p className={"text-white"}>{data?.overview}</p>
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
        <Banner type={type} />
      </div>
      <div className={"container py-4"}>
        <Content type={type} />
      </div>
    </main>
  );
};

export default DetailsPage;
