import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <main className={"mt-10"}>
      <div>
        <h1 className={"text-yellow text-3xl"}>Featured Today</h1>

        <Tabs defaultValue="movies" className="w-full mt-3">
          <TabsList className={"w-full"}>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
          </TabsList>
          <TabsContent value="movies" className={"text-white"}>
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="series" className={"text-white"}>
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Page;
