"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Play, Info } from 'lucide-react'

interface Movie {
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string; // Added for better mobile fallback
}

export default function Hero({ fetchUrl }: { fetchUrl: string }) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchHero() {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      setMovie(randomMovie);
    }
    fetchHero();
  }, [fetchUrl]);

  if (!movie) return <div className="h-[70vh] md:h-[95vh] bg-black animate-pulse" />;

  return (
    <div className="relative flex flex-col space-y-4 py-16 md:space-y-4 h-[75vh] sm:h-[85vh] lg:h-[95vh] justify-center md:justify-end pb-10 px-4 md:px-12 lg:pb-12">
      
      {/* Background Image Container */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Hero"
          fill
          className="object-cover object-top md:object-center" // Better cropping for mobile
          priority
        />
        {/* Advanced Gradient Overlays */}
        {/* 1. Bottom fade (The core Netflix look) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010511] via-transparent to-black/20" />
        {/* 2. Left-side fade for desktop readability */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Area */}
      <div className="z-10 flex flex-col items-start text-left">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-7xl mb-3 md:mb-5 max-w-[90%] md:max-w-[70%] lg:max-w-[60%] leading-tight">
          {movie?.title || movie?.name}
        </h1>

        <p className="max-w-[100%] text-sm text-gray-200 text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
          {movie?.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <button className="flex items-center gap-x-2 rounded bg-white px-6 py-2 text-sm font-bold text-black transition hover:bg-gray-300 md:px-8 md:py-2.5 md:text-xl shadow-lg">
            <Play className="h-5 w-5 fill-black md:h-7 md:w-7" />
            Play
          </button>
          
          <button className="flex items-center gap-x-2 rounded bg-gray-500/60 px-6 py-2 text-sm font-bold text-white transition hover:bg-gray-500/90 md:px-8 md:py-2.5 md:text-xl backdrop-blur-md">
            <Info className="h-5 w-5 md:h-7 md:w-7" />
            <span className="md:inline">More Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}