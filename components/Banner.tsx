import Image from "next/image";
import { MovieDetails, TVDetails } from "@/types";
import { formatTime, formatYear } from "@/lib/utils";

const Banner = ({
  type,
  tvDetails,
  movieDetails,
}: {
  type: string | null;
  tvDetails?: TVDetails;
  movieDetails?: MovieDetails;
}) => {
  if (type === "tv") {
    return (
      <div className={"container flex gap-4 items-center justify-between"}>
        <div className={"flex flex-col items-start justify-center gap-3"}>
          <p className={"uppercase text-yellow text-3xl"}>{type}</p>
          <p className={"text-white uppercase text-3xl"}>{tvDetails?.name}</p>

          <div className={"flex gap-2"}>
            <p className={"text-white"}>
              {formatYear(tvDetails?.first_air_date)}
            </p>
            <p className={"text-white"}>
              {tvDetails?.number_of_seasons} season
              {tvDetails?.number_of_seasons! > 1 && "s"}
            </p>
          </div>
        </div>
        <div>
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
              {tvDetails?.vote_count} <br /> ratings
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (type === "movie") {
    return (
      <div className={"container flex gap-4 items-center justify-between"}>
        <div className={"flex flex-col items-start justify-center gap-3"}>
          <p className={"uppercase text-yellow text-3xl"}>{type}</p>
          <p className={"text-white uppercase text-3xl"}>
            {movieDetails?.original_title}
          </p>

          <div className={"flex gap-2"}>
            <p className={"text-white"}>
              {formatYear(movieDetails?.release_date)}
            </p>
            <p className={"text-white"}>{formatTime(movieDetails?.runtime)}</p>
          </div>
        </div>
        <div>
          <div className={"flex items-center gap-3"}>
            <Image
              src={"/icons/star-icon.svg"}
              alt={"Ratings"}
              width={40}
              height={40}
            />

            <p className={"text-white text-3xl"}>
              {movieDetails?.vote_average.toFixed(1)}
            </p>
            <p className={"text-gray-200 text-sm"}>
              {movieDetails?.vote_count}
              <br />
              ratings
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Banner;
