import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeaturedMovies from "@/components/FeaturedMovies";
import FeaturedSeries from "@/components/FeaturedSeries";
import Upcoming from "@/components/Upcoming";

const Page = () => {
  return (
    <main className={"mt-10 py-4 container"}>
      <div>
        <h1 className={"text-yellow text-3xl"}>Featured Today</h1>

        <Tabs defaultValue="movies" className="w-full h-full mt-3">
          <TabsList className={"w-full"}>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
          </TabsList>
          <TabsContent value="movies">
            <FeaturedMovies />
          </TabsContent>
          <TabsContent value="series">
            <FeaturedSeries />
          </TabsContent>
        </Tabs>
      </div>

      <div className={"mt-10"}>
        <h1 className={"text-yellow text-3xl"}>Premieres and announcements</h1>
        <div className={"mt-3"}>
          <Upcoming />
        </div>
      </div>
    </main>
  );
};

export default Page;
