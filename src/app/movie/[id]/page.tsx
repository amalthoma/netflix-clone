import { fetchFromTMDB } from "../../lib/tmdb";

// 1. Define the props as a Promise
interface Props {
  params: Promise<{ id: string }>;
}
export default async function MoviePage({ params }: Props) {
    // 2. Await the params to get the actual ID
  const { id } = await params;
  const movie = await fetchFromTMDB(`/movie/${id}`);
  const videos = await fetchFromTMDB(`/movie/${id}/videos`);
  const similar = await fetchFromTMDB(`/movie/${id}/similar`);

  const trailer = videos.results.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-[300px] rounded"
          alt={movie.title}
        />

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">{movie.release_date}</p>
          <p className="mt-4 max-w-2xl">{movie.overview}</p>

          <p className="mt-4">
            ⭐ Rating: {movie.vote_average.toFixed(1)}
          </p>

          {trailer && (
            <a
              href={`#trailer`}
              className="inline-block mt-6 bg-red-600 px-6 py-2 rounded"
            >
              ▶ Watch Trailer
            </a>
          )}
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <div id="trailer" className="mt-16">
          <h2 className="text-2xl mb-4">Trailer</h2>
          <iframe
            className="w-full aspect-video rounded"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
          />
        </div>
      )}

      {/* Similar Movies */}
      <div className="mt-16">
        <h2 className="text-2xl mb-4">More Like This</h2>
        <div className="flex gap-4 overflow-x-scroll">
          {similar.results.map((movie: any) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="w-[180px] rounded hover:scale-110 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
