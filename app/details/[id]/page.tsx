"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDetails } from "@/app/actions/getDetails";
import { MovieDetails, TVDetails } from "@/types";
import Image from "next/image";

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
                    {data?.vote_count} ratings
                  </p>
                </div>
              </>
            )}
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
    </main>
  );
};

export default DetailsPage;
