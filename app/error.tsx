"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center text-white">
      <Image
        src={"/icons/plug-error-illustration.svg"}
        alt={"Error Icon"}
        width={300}
        height={300}
      />
      <h1 className={"font-extrabold text-3xl mt-5"}>Oops...</h1>
      <h2 className="text-center text-xl mt-2">Something went wrong</h2>
      <button
        className="mt-4 rounded-md bg-yellow px-4 py-2 text-sm text-white transition-colors"
        onClick={() => reset()}
      >
        Refresh
      </button>
    </main>
  );
}
