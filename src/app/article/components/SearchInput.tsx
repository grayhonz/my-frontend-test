// src/app/article/components/SearchInput.tsx
import { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleDebounce = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onSearch(query);
      }, 500); // Debounce delay 500ms
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    };
    handleDebounce();
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      {/* Icon Search di kiri */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input dengan padding kiri agar tidak menimpa ikon */}
      <input
        type="text"
        placeholder="Search articles"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 pl-10 pr-4 border border-white rounded-md bg-white text-black placeholder-grey-600 focus:outline-none focus:border-blue-200"
      />
    </div>
  );
};

export default SearchInput;