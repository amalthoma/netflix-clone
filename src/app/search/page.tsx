"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// 1. Move the search logic into a separate internal component
function SearchContent() {
  const params = useSearchParams();
  const query = params.get("q");
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    };

    fetchSearch();
  }, [query]);

  return (
    <main className="pt-24 px-6 min-h-screen bg-black">
      <h1 className="text-2xl text-white mb-6">
        Search results for “{query || ""}”
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="relative group cursor-pointer">
              <img
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
                  : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.title}
                className="rounded-md hover:scale-105 transition duration-300 w-full object-cover"
              />
              <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// 2. The main export wraps SearchContent in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 px-6 text-white text-center">
        Loading search results...
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}