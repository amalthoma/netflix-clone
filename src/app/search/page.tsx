"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q");
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
    };

    fetchSearch();
  }, [query]);

  return (
    <main className="pt-24 px-6">
      <h1 className="text-2xl text-white mb-6">
        Search results for “{query}”
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="rounded hover:scale-105 transition"
            />
          ))}
        </div>
      )}
    </main>
  );
}
