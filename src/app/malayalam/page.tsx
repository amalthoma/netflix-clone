import React from "react";
import MalayalamMovieRow from "../components/MalayalamMovieRow";

export default function MalayalamPage() {
  // 1. ADD YOUR API KEY HERE
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual key
  const BASE_URL = "https://api.themoviedb.org/3";
  
  const today = new Date().toISOString().split("T")[0];

  // 2 Months ago for Theatres
  const d1 = new Date();
  d1.setMonth(d1.getMonth() - 2);
  const twoMonthsAgo = d1.toISOString().split("T")[0];

  // 6 Months ago for OTT
  const d2 = new Date();
  d2.setMonth(d2.getMonth() - 6);
  const sixMonthsAgo = d2.toISOString().split("T")[0];

  return (
    <main className="pt-24 pb-10 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold px-6 mb-10">
        Malayalam Movies Hub 🎬
      </h1>

      {/* 1. UPCOMING */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold px-6 mb-4 border-l-4 border-red-600 pl-3">
          Upcoming Malayalam Movies
        </h2>
        <MalayalamMovieRow
          title=""
          // Added &api_key=${API_KEY} at the end
          endpoint={`${BASE_URL}/discover/movie?with_original_language=ml&region=IN&sort_by=primary_release_date.asc&primary_release_date.gte=${today}&api_key=${API_KEY}`}
        />
      </section>

      {/* 2. IN THEATRES */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold px-6 mb-4 border-l-4 border-red-600 pl-3">
          Now Running in Theatres
        </h2>
        <MalayalamMovieRow
          title=""
          // Added &api_key=${API_KEY} at the end
          endpoint={`${BASE_URL}/discover/movie?with_original_language=ml&region=IN&with_release_type=3|2&primary_release_date.lte=${today}&primary_release_date.gte=${twoMonthsAgo}&sort_by=primary_release_date.desc&api_key=${API_KEY}`}
        />
      </section>

      {/* 3. OTT RELEASES */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold px-6 mb-4 border-l-4 border-red-600 pl-3">
          Malayalam OTT Releases
        </h2>
        <p className="px-6 text-gray-400 text-sm mb-4">
           Includes Netflix, Prime, Hotstar, ManoramaMAX, Zee5, SonyLIV
        </p>
        <MalayalamMovieRow
          title=""
          // Added &api_key=${API_KEY} at the end
          endpoint={`${BASE_URL}/discover/movie?with_original_language=ml&watch_region=IN&with_release_type=4&with_watch_providers=8|9|337|122|237|418|232&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&primary_release_date.gte=${sixMonthsAgo}&api_key=${API_KEY}`}
        />
      </section>
    </main>
  );
}