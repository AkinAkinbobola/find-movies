"use server";

export const getDetails = async (id: number, type: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US&append_to_response=credits`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    );
    return await response.json();
  } catch (error) {
    return {
      message: "Failed to get data.",
    };
  }
};
