"use client";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios"; 

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 
const BASE_URL = "https://api.themoviedb.org/3"; 

function MalayalamMovieRow({ title, endpoint }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(endpoint);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchData();
  }, [endpoint]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); 
    } else {
      try {
        const videoUrl = `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}&include_video_language=ml,en`;
        const response = await axios.get(videoUrl);
        
        const trailer = response.data.results.find(
          (vid) => 
            vid.site === "YouTube" && 
            (vid.type === "Trailer" || vid.type === "Teaser")
        );

        if (trailer) {
          setTrailerUrl(trailer.key);
        } else {
          alert("Trailer not available for this movie yet.");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    }
  };

  // Responsive Player Options
  const opts = {
    height: "100%", // let CSS handle the height
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="ml-5 text-white">
      <h2 className="text-2xl font-bold">{title}</h2>

      {/* Movie Posters Row */}
      <div className="flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="w-[140px] h-[210px] md:w-[200px] md:h-[300px] object-cover mr-3 rounded-lg hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer flex-shrink-0"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>

      {/* --- RESPONSIVE VIDEO SECTION --- */}
      {trailerUrl && (
        <div className="relative w-full md:w-[80%] lg:w-[60%] mx-auto pb-10 px-4">
          
          {/* Close Button Header */}
          <div className="flex justify-end mb-2">
            <button 
              onClick={() => setTrailerUrl("")} 
              className="bg-red-600 text-white px-4 py-2 text-sm md:text-base rounded font-bold hover:bg-red-700 transition"
            >
              Close X
            </button>
          </div>

          {/* Aspect Ratio Container for Video */}
          <div className="relative pt-[56.25%] w-full bg-black border border-gray-800 rounded-lg overflow-hidden">
            <YouTube 
              videoId={trailerUrl} 
              opts={opts} 
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MalayalamMovieRow;