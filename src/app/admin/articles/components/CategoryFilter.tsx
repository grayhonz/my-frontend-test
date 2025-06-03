// src/app/admin/articles/components/CategoryFilter.tsx
import React from "react";
import { useState } from "react";

interface CategoryFilterProps {
  onFilterChange: (category: string | undefined) => void;
}

const CategoryFilter = ({ onFilterChange }: CategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category || undefined);
    onFilterChange(category || undefined);
  };

  return (
    <div>
      <label htmlFor="category" className="block text-sm text-black font-medium">
        Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="">All Categories</option>
        {/* Simulasi data kategori */}
        <option value="Technology">Technology</option>
        <option value="Design">Design</option>
        <option value="Techniques">Techniques</option>
        <option value="Optimization">Optimization</option>
        <option value="Business">Business</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
    </div>
  );
};

export default CategoryFilter;