"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Play, Info } from 'lucide-react'

interface Movie {
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
}

export default function Hero({ fetchUrl }: { fetchUrl: string }) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchHero() {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      // Pick a random movie from the results for the Hero
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      setMovie(randomMovie);
    }
    fetchHero();
  }, [fetchUrl]);

  if (!movie) return <div className="h-[95vh] bg-black" />;

  return (
    <div className="relative flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[95vh] lg:justify-end lg:pb-12">
      {/* Background Image */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Hero"
          fill
          className="object-cover"
          priority // Loads this image first for better performance (LCP)
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010511] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview.length > 150 ? movie.overview.substring(0, 150) + "..." : movie.overview}
      </p>

      <div className="flex space-x-3">
        <button className="flex items-center gap-x-2 rounded bg-white px-5 py-1.5 text-sm font-semibold text-black transition hover:bg-gray-200 md:px-8 md:py-2.5 md:text-xl">
          <Play className="h-4 w-4 fill-black md:h-7 md:w-7" />
          Play
        </button>
        <button className="flex items-center gap-x-2 rounded bg-gray-500/70 px-5 py-1.5 text-sm font-semibold text-white transition hover:bg-gray-500 md:px-8 md:py-2.5 md:text-xl">
          <Info className="h-4 w-4 md:h-7 md:w-7" />
          More Info
        </button>
      </div>
    </div>
  )
}