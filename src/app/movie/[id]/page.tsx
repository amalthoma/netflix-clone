import { fetchFromTMDB } from "../../lib/tmdb";
import Link from "next/link";
// Import the new button component
import WatchTrailerButton from "../../components/WatchTrailerButton"; 

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  
  const [movie, videos, similar] = await Promise.all([
    fetchFromTMDB(`/movie/${id}`),
    fetchFromTMDB(`/movie/${id}/videos`),
    fetchFromTMDB(`/movie/${id}/similar`)
  ]);

  const trailer = videos.results.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-12 lg:p-20 pt-24">
      {/* Main Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Poster */}
        <div className="relative w-full max-w-[280px] md:max-w-[350px] flex-shrink-0 shadow-2xl shadow-white/5">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-full rounded-lg object-cover border border-white/10"
            alt={movie.title}
          />
        </div>

        {/* Text Details */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-gray-400 text-sm md:text-base">
            <span>{movie.release_date?.split('-')[0]}</span>
            <span className="border px-2 py-0.5 rounded text-xs border-gray-600">HD</span>
            <span className="text-yellow-500 font-bold">⭐ {movie.vote_average?.toFixed(1)}</span>
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed max-w-3xl text-sm md:text-lg">
            {movie.overview}
          </p>

          {/* 🔴 REPLACED: Use the new Client Component here */}
          {trailer && <WatchTrailerButton trailerId={trailer.key} />}
          
        </div>
      </div>

      {/* 🔴 REMOVED: The 'iframe' section is gone. The button handles it now. */}

      {/* Similar Movies Section */}
      <div className="mt-20 mb-10">
        <h2 className="text-xl md:text-3xl font-bold mb-6 border-l-4 border-red-600 pl-4">
          More Like This
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {similar.results.filter((m: any) => m.poster_path).map((movie: any) => (
            <Link 
              key={movie.id} 
              href={`/movie/${movie.id}`}
              className="flex-none w-[140px] md:w-[200px] snap-start"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                className="w-full h-auto rounded-md hover:scale-105 transition-transform duration-300 cursor-pointer object-cover aspect-[2/3]"
                alt={movie.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}