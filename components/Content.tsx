import {
  countries,
  directors,
  formatDate,
  screenplay,
  stars,
} from "@/lib/utils";
import { Genre, MovieDetails, TVDetails } from "@/types";

const Content = ({
  type,
  tvDetails,
  movieDetails,
}: {
  type: string | null;
  tvDetails?: TVDetails;
  movieDetails?: MovieDetails;
}) => {
  if (type === "tv") {
    const imageUrl = `https://image.tmdb.org/t/p/original${tvDetails?.poster_path}`;
    const cast = stars(tvDetails?.credits.cast);
    const ctr = countries(tvDetails?.production_countries);
    const date = formatDate(tvDetails?.first_air_date);

    return (
      <div className={"flex flex-col md:flex-row gap-5"}>
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://placehold.co/250x200.png?text=Image+Not\\nFound&font=Lato"
          }
          alt={`Poster`}
          width={250}
          height={200}
          className={"rounded-md object-cover hidden md:inline-block"}
        />
        <div className={"flex flex-col justify-between"}>
          <div className={"flex gap-3 flex-wrap"}>
            {tvDetails?.genres.map((genre: Genre) => {
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

          <p className={"text-white"}>{tvDetails?.overview}</p>
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

  if (type === "movie") {
    const imageUrl = `https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`;
    const dir = directors(movieDetails?.credits.crew);
    const screens = screenplay(movieDetails?.credits.crew);
    const cast = stars(movieDetails?.credits.cast);
    const ctr = countries(movieDetails?.production_countries);
    const date = formatDate(movieDetails?.release_date);
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

export default Content;
