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

  if (!movie) return null;

  return (
    <>
      <div
        className="relative h-[85vh] bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 px-10 pt-40 max-w-2xl">
          <h1 className="text-5xl font-extrabold">{movie.title}</h1>
          <p className="mt-4 text-gray-300 line-clamp-3">
            {movie.overview}
          </p>

          <div className="mt-6 flex gap-4">
            {/* PLAY BUTTON */}
            <button
              onClick={playTrailer}
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition"
            >
              ▶ Play
            </button>

            {/* MORE INFO BUTTON */}
            <button
              onClick={() => router.push(`/movie/${movie.id}`)}
              className="bg-gray-700/70 px-6 py-2 rounded hover:bg-gray-600 transition"
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
