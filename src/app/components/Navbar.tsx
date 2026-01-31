"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-red-600 text-2xl font-bold">
          NETFLIX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/movies" className="text-white">Movies</Link>
          <Link href="/my-list" className="text-white">My List</Link>
          <Link href="/malayalam" className="text-white">Malayalam</Link>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-black/60 border border-gray-600 text-white px-3 py-1 rounded outline-none focus:border-white"
            />
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 px-6 pb-4 space-y-4">
          <Link href="/" className="block text-white" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/movies" className="block text-white" onClick={() => setMenuOpen(false)}>
            Movies
          </Link>
          <Link href="/my-list" className="block text-white" onClick={() => setMenuOpen(false)}>
            My List
          </Link>
          <Link href="/malayalam" className="block text-white" onClick={() => setMenuOpen(false)}>
            Malayalam
          </Link>
        

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black/60 border border-gray-600 text-white px-3 py-2 rounded outline-none focus:border-white"
            />
          </form>
        </div>
      )}
    </nav>
  );
}
