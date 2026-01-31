"use client";

import { useState } from "react";
// Import YOUR existing modal
import TrailerModal from "./TrailerModal"; 

interface Props {
  trailerId: string;
}

export default function WatchTrailerButton({ trailerId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-bold transition-all w-full md:w-auto gap-2"
      >
        <span>▶</span> Watch Trailer
      </button>

      {/* Your Modal - Only shows when isOpen is true */}
      {isOpen && (
        <TrailerModal 
          videoKey={trailerId} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}