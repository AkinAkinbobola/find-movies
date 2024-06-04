"use server";

export const findMovie = async (query: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data.results;
};
