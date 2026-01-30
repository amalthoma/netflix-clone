"use client";

import { useEffect, useState } from "react";
import TrailerModal from "./TrailerModal";
import { useRouter } from "next/navigation";

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
      setMovie(data.results[0]);
    };

    fetchMovie();
  }, []);

  const playTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();

    const trailer = data.results.find(
      (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    if (trailer) setTrailerKey(trailer.key);
  };

  if (!movie) return <div className="h-[50vh] lg:h-[85vh] bg-black animate-pulse" />;

  return (
    <>
      <div
        className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] w-full bg-cover bg-top md:bg-center text-white flex flex-col justify-center md:justify-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* Gradients: Bottom fade for everyone, Left fade for Desktop readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 px-6 md:px-12 pb-10 md:pb-20 max-w-xl lg:max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">
            {movie.title}
          </h1>
          
          <p className="mt-4 text-sm md:text-lg text-gray-200 line-clamp-3 md:line-clamp-4 drop-shadow">
            {movie.overview}
          </p>

          <div className="mt-6 flex flex-row gap-3 md:gap-4">
            {/* PLAY BUTTON */}
            <button
              onClick={playTrailer}
              className="flex-1 md:flex-none flex items-center justify-center bg-white text-black px-5 md:px-8 py-2 rounded font-bold hover:bg-gray-300 transition text-sm md:text-base"
            >
              <span className="mr-2">▶</span> Play
            </button>

            {/* MORE INFO BUTTON */}
            <button
              onClick={() => router.push(`/movie/${movie.id}`)}
              className="flex-1 md:flex-none flex items-center justify-center bg-gray-500/70 text-white px-5 md:px-8 py-2 rounded font-bold hover:bg-gray-600 transition backdrop-blur-md text-sm md:text-base"
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerKey(null)}
        />
      )}
    </>
  );
}