"use server";

export const getCredit = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US'`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data.cast;
};
