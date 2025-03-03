'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 max-w-md mx-auto">
      <input
        type="search"
        className="border border-gray-400 w-full py-2 px-3 rounded-md"
        placeholder="Search phrase.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
        Search
      </button>
    </form>
  );
}
