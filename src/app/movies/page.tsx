import MovieRow from "../components/MovieRow";
import Navbar from "../components/Navbar";

export default function MoviesPage() {
  return (
    <main className="pt-24">
    <Navbar />
      <MovieRow title="Popular" endpoint="/movie/popular" />
      <MovieRow title="Now Playing" endpoint="/movie/now_playing" />
      <MovieRow title="Upcoming" endpoint="/movie/upcoming" />
      <MovieRow title="Comedy" endpoint="/discover/movie?with_genres=35" />
      <MovieRow title="Horror" endpoint="/discover/movie?with_genres=27" />
    </main>
  );
}
