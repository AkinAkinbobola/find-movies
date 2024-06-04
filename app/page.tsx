import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeaturedMovies from "@/components/FeaturedMovies";
import FeaturedSeries from "@/components/FeaturedSeries";

const Page = () => {
  return (
    <main className={"mt-10"}>
      <div>
        <h1 className={"text-yellow text-3xl"}>Featured Today</h1>

        <Tabs defaultValue="movies" className="w-full h-full mt-3">
          <TabsList className={"w-full"}>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
          </TabsList>
          <TabsContent value="movies" className={"text-white"}>
            <FeaturedMovies />
          </TabsContent>
          <TabsContent value="series" className={"text-white"}>
            <FeaturedSeries />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Page;
