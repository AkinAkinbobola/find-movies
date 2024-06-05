"use server";

export const getPopular = async (type: string, page = 1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${page}`,
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
  } catch (error) {
    return {
      message: "Failed to get data.",
    };
  }
};
