// src/app/admin/articles/components/SearchInput.tsx
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
    <div className="relative text-black">
      <input
        type="text"
        placeholder="Search by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border rounded"
      />
    </div>
  );
};

export default SearchInput;