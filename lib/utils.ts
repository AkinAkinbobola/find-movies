import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
