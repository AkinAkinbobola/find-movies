import Image from "next/image";
import { useEffect, useState } from "react";
import { getCredit } from "@/app/actions/getCredit";

const MovieSearchCard = ({
  poster,
  title,
  date,
  id,
}: {
  poster: string;
  title: string;
  date: string;
  id: number;
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${poster}`;
  const year = date.split("-")[0];

  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    const fetchCast = async () => {
      const data = await getCredit(id);
      setCast(data.slice(0, 3));
    };
    fetchCast();
  }, []);

  const castNames = () => {
    const names = cast?.map((c) => c.name);
    return names?.join(", ");
  };

  return (
    <div className={"flex py-3 px-2 gap-2 hover:bg-hover"}>
      <Image
        src={
          poster
            ? imageUrl
            : "https://placehold.co/300.png?text=Image+Not\\nFound&font=Lato"
        }
        alt={`${title} Poster`}
        width={50}
        height={50}
        className={"rounded-md object-cover"}
      />

      <div className={"flex flex-col gap-1.5"}>
        <p className={"text-white"}>{title}</p>
        <p className={"text-gray-200"}>{year}</p>

        <p className={"text-sm hidden md:inline-block"}>{castNames()}</p>
      </div>
    </div>
  );
};

export default MovieSearchCard;
