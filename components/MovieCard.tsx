import Image from "next/image";
import Link from "next/link";

const MovieCard = ({
  title,
  poster,
  score,
  id,
  type,
}: {
  title: string;
  poster?: string;
  score: number;
  id: number;
  type: string;
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${poster}`;
  return (
    <Link href={`/details/${id}?type=${type}`}>
      <div className={"flex flex-col min-w-[180px] gap-2"}>
        <div className={"relative"}>
          <img
            src={
              poster
                ? imageUrl
                : "https://placehold.co/300.png?text=Image+Not\\nFound&font=Lato"
            }
            alt={`${title} Poster`}
            width={500}
            height={500}
            className={"rounded-md object-cover"}
          />

          <div
            className={
              "absolute bottom-0 left-0 flex items-center bg-black rounded-tr p-1 gap-1"
            }
          >
            <Image
              src={"/icons/star-icon.svg"}
              alt={`${title} Poster`}
              width={15}
              height={15}
            />
            <span className={"text-white text-sm"}>{score.toFixed(1)}</span>
          </div>
        </div>
        <p className={"text-center text-white text-sm"}>{title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
