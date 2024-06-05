import { Skeleton } from "@/components/ui/skeleton";

const SkeletonMovieCard = () => {
  return (
    <div className={"flex overflow-y-auto no-scrollbar gap-5"}>
      {Array(20)
        .fill(null)
        .map((_, i) => (
          <div className={"flex flex-col gap-2"} key={i}>
            <Skeleton className={"w-[180px] h-[250px]"} />
            <Skeleton className={"w-full h-[10px] mx-auto"} />
          </div>
        ))}
    </div>
  );
};

export default SkeletonMovieCard;
