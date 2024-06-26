"use server";

export const findMovie = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    );
    const data = await response.json();
    return data.results.slice(0, 5);
  } catch (error) {
    return {
      message: "Failed to get data.",
    };
  }
};
