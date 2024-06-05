import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cast, Crew, ProductionCountry } from "@/types";
import moment from "moment/moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatYear = (date: string | undefined) => {
  return date?.split("-")[0];
};

export const formatTime = (time: number | undefined) => {
  const hours = Math.floor(time! / 60);
  const minutes = time! % 60;
  return `${hours}h ${minutes}m`;
};

export const stars = (casts?: Cast[]) => {
  const cast = casts?.slice(0, 3).map((c) => c.name);
  return cast?.join(", ");
};

export const countries = (ctr?: ProductionCountry[]) => {
  const ctrJoined = ctr?.map((c) => c.name);
  return ctrJoined?.join(", ");
};

export const formatDate = (date?: string) => {
  return moment(date).format("MMMM D, YYYY");
};

export const directors = (crew?: Crew[]) => {
  const directors = crew?.filter((dir) => dir.job === "Director");
  const names = directors?.map((dir) => dir.name);
  return names?.join(", ");
};

export const screenplay = (crew?: Crew[]) => {
  const screenplayMakers = crew?.filter((s) => s.job === "Screenplay");
  const names = screenplayMakers?.map((s) => s.name);
  return names?.join(", ");
};
