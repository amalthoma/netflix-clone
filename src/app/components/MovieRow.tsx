"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MovieRow({ title, endpoint }: any) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState([]);

useEffect(() => {
  const fetchMovies = async () => {
    // Check if endpoint already has a '?'
    const separator = endpoint.includes("?") ? "&" : "?";
    
    const url = `https://api.themoviedb.org/3${endpoint}${separator}api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error("Fetch failed for URL:", url);
      return;
    }
    
    const data = await res.json();
    setMovies(data.results);
  };

  fetchMovies();
}, [endpoint]);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-6">
      <h2 className="text-xl text-white mb-3">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 
                   bg-black/70 hover:bg-black text-white p-2 rounded-full hidden md:flex"
      >
        ◀
      </button>

      {/* Movie Row */}
      <div
        ref={rowRef}
        className="flex overflow-x-scroll gap-4 py-4 px-2 no-scrollbar scroll-smooth"
      >
        {movies.map((movie: any) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="relative flex-none w-[140px] h-[210px] md:w-[200px] md:h-[300px]
                       transition-transform duration-300 hover:scale-110"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md object-cover w-full h-full shadow-lg"
              loading="lazy"
            />
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 
                   bg-black/70 hover:bg-black text-white p-2 rounded-full hidden md:flex"
      >
        ▶
      </button>
    </div>
  );
}


