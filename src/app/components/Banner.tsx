"use client";

import { useEffect, useState } from "react";
import TrailerModal from "./TrailerModal";
import { useRouter } from "next/navigation";
import { FaPlay, FaInfoCircle } from "react-icons/fa"; 

export default function Banner() {
  const [movie, setMovie] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      const randomMovie = data.results[Math.floor(Math.random() * 10)];
      setMovie(randomMovie);
    };

    fetchMovie();
  }, []);

  const playTrailer = async () => {
    if (!movie) return;
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();

    const trailer = data.results.find(
      (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    if (trailer) {
      setTrailerKey(trailer.key);
    } else {
      router.push(`/movie/${movie.id}`);
    }
  };

  if (!movie) return <div className="h-[70vh] lg:h-[85vh] bg-black animate-pulse" />;

  return (
    <>
      <div className="relative h-[65vh] md:h-[80vh] lg:h-[90vh] w-full text-white overflow-hidden group">
        
        {/* --- BACKGROUND IMAGE --- */}
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-in-out group-hover:scale-105"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
        />

        {/* --- OVERLAYS --- */}
        <div className="absolute inset-0 bg-black/20" /> {/* Slightly lighter overall tint */}
        
        {/* Deep bottom gradient to ensure text readability since we are moving it down */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent bottom-0 h-full" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-3/4" />


        {/* --- CONTENT (MOVED DOWN) --- */}
        {/* Changed bottom-20% to bottom-5% (mobile) and bottom-10% (desktop) */}
        <div className="absolute bottom-[5%] md:bottom-[10%] lg:bottom-[12%] left-0 px-6 md:px-12 lg:px-16 max-w-2xl w-full flex flex-col gap-3 md:gap-4">
          
          <div className="bg-red-600 w-fit px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-1 animate-fade-in shadow-lg">
             #1 Trending
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight drop-shadow-xl leading-none">
            {movie.title || movie.name}
          </h1>

          <div className="flex items-center gap-4 text-sm md:text-base text-gray-200 font-semibold drop-shadow-md">
             <span className="text-green-400">{(movie.vote_average * 10).toFixed(0)}% Match</span>
             <span>{movie.release_date?.split("-")[0]}</span>
             <span className="border border-gray-400 px-1 text-xs rounded">HD</span>
          </div>

          <p className="text-sm md:text-lg text-gray-300 line-clamp-3 md:line-clamp-3 drop-shadow-lg max-w-xl">
            {movie.overview}
          </p>

          <div className="flex flex-row gap-3 mt-4">
            <button
              onClick={playTrailer}
              className="flex items-center justify-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-opacity-80 transition active:scale-95 shadow-lg"
            >
              <FaPlay className="text-lg" /> 
              <span>Play</span>
            </button>

            <button
              onClick={() => router.push(`/movie/${movie.id}`)}
              className="flex items-center justify-center gap-2 bg-gray-500/40 backdrop-blur-sm text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-gray-500/60 transition active:scale-95 border border-white/20 shadow-lg"
            >
              <FaInfoCircle className="text-xl" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerKey(null)}
        />
      )}
    </>
  );
}