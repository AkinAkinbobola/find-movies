"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDetails } from "@/app/actions/getDetails";
import { MovieDetails, TVDetails } from "@/types";
import Banner from "@/components/Banner";
import Content from "@/components/Content";
import { Skeleton } from "@/components/ui/skeleton";

const DetailsPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = Number(pathname.split("/").pop());
  const [loading, setLoading] = useState(true);
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

  return (
    <main>
      <div className={"bg-gray w-full py-20"}>
        {!loading ? (
          <Banner
            type={type}
            tvDetails={tvDetails}
            movieDetails={movieDetails}
          />
        ) : (
          <div className={"container flex gap-4 items-center justify-between"}>
            <div className={"flex flex-col gap-4"}>
              <Skeleton className={"w-[100px] h-[20px]"} />
              <Skeleton className={"w-[300px] h-[20px]"} />
              <div className={"flex gap-3 items-center"}>
                <Skeleton className={"w-[50px] h-[10px]"} />
                <Skeleton className={"w-[50px] h-[10px]"} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={"container py-4"}>
        {!loading ? (
          <Content
            type={type}
            tvDetails={tvDetails}
            movieDetails={movieDetails}
          />
        ) : (
          <div className={"flex gap-4"}>
            <Skeleton
              className={"w-[250px] h-[250px] hidden md:inline-block"}
            />
            <div className={"flex flex-col gap-4 md:justify-between"}>
              <div className={"flex gap-3"}>
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton
                      className={"w-[60px] h-[30px] rounded-full"}
                      key={i}
                    />
                  ))}
              </div>

              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <div className={"flex gap-2"} key={i}>
                    <Skeleton className={"w-[100px] h-[20px]"} /> :{" "}
                    <Skeleton className={"w-[200px] h-[20px]"} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DetailsPage;
