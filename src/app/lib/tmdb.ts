const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const fetchFromTMDB = async (endpoint: string) => {
  // Logic: If endpoint contains '?', use '&' for the API key. Otherwise, use '?'.
  const separator = endpoint.includes('?') ? '&' : '?';
  const fullUrl = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;
  
  console.log('Fetching from TMDB:', fullUrl);

  const res = await fetch(fullUrl, { cache: "no-store" });

  if (!res.ok) {
    console.error(`Fetch failed for: ${fullUrl} - Status: ${res.status}`);
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  return res.json();
};