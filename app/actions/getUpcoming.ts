"use server";

export const getUpcoming = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
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
