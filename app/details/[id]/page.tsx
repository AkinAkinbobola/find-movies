"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDetails } from "@/app/actions/getDetails";
import { MovieDetails, TVDetails } from "@/types";
import Banner from "@/components/Banner";
import Content from "@/components/Content";

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

  return (
    <main>
      <div className={"bg-gray w-full py-20"}>
        <Banner type={type} tvDetails={tvDetails} movieDetails={movieDetails} />
      </div>
      <div className={"container py-4"}>
        <Content
          type={type}
          tvDetails={tvDetails}
          movieDetails={movieDetails}
        />
      </div>
    </main>
  );
};

export default DetailsPage;
