"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MovieRow({ title, endpoint }: any) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Check if endpoint already has a '?' to correctly append query params
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

    // Adjust scroll distance based on screen width
    // On mobile we might scroll less, on desktop more
    const scrollAmount = window.innerWidth < 768 ? 300 : 500;

    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    // Responsive container padding: px-4 on mobile, px-8 on desktop
    <div className="relative px-4 md:px-8 my-4 md:my-8">
      {/* Responsive Title size */}
      <h2 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">
        {title}
      </h2>

      {/* Left Arrow - Hidden on Mobile (Touch screens use swipe) */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 md:left-4 top-[60%] z-20 -translate-y-1/2 
                   bg-black/60 hover:bg-black text-white p-2 md:p-3 rounded-full 
                   hidden md:flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
      >
        ◀
      </button>

      {/* Movie Row Container */}
      {/* 'group' class allows arrows to show only on hover */}
      <div className="group relative">
         {/* Left Arrow (Desktop only) */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-40 w-12 
                     bg-gradient-to-r from-black/80 to-transparent 
                     hidden md:flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-3xl pb-10">‹</span>
        </button>

        <div
          ref={rowRef}
          className="flex overflow-x-scroll gap-3 md:gap-4 py-4 px-2 no-scrollbar scroll-smooth"
        >
          {movies.map((movie: any) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              // Responsive Card Sizes:
              // Mobile: w-[120px] h-[180px]
              // Desktop: w-[200px] h-[300px]
              className="relative flex-none w-[120px] h-[180px] md:w-[200px] md:h-[300px]
                         transition-transform duration-300 hover:scale-105 z-10"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg object-cover w-full h-full shadow-lg"
                loading="lazy"
              />
            </Link>
          ))}
        </div>

        {/* Right Arrow (Desktop only) */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 
                     bg-gradient-to-l from-black/80 to-transparent 
                     hidden md:flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-3xl pb-10">›</span>
        </button>
      </div>
    </div>
  );
}