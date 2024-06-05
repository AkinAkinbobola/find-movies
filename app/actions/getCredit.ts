"use server";

import { MediaType } from "@/types";

export const getCredit = async (id: number, type: MediaType) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US'`,
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
  } catch (error) {
    return {
      message: "Failed to get data.",
    };
  }
};
