import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MovieRow from "./components/MovieRow";
import { requests } from "./lib/requests";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Banner />

      <MovieRow title="Trending Now" endpoint={requests.trending} />
      <MovieRow title="Top Rated" endpoint={requests.topRated} />
      <MovieRow title="Action Movies" endpoint={requests.action} />
      <MovieRow title="Comedy Movies" endpoint={requests.comedy} />
      <MovieRow title="Horror Movies" endpoint={requests.horror} />
    </main>
  );
}
