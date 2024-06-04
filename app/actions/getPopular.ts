"use server";

export const getPopular = async (type: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );

  const data = await response.json();
  return data.results.slice(0, 20);
};
