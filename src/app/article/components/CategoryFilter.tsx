// src/app/article/components/CategoryFilter.tsx
import { useState, useEffect } from "react";
// import axios from "axios";

interface CategoryFilterProps {
  onFilterChange: (category: string | undefined) => void;
  useDummyData?: boolean; // New prop to toggle dummy data
}

const CategoryFilter = ({ onFilterChange, useDummyData = true }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Dummy data
  const dummyCategories: string[] = ["Design", "Trends", "Interview", "People", "Accessibility", "Techniques"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (useDummyData) {
          // Use dummy data
          setCategories(dummyCategories);
        } else {
          // Fetch from API
          // const response = await axios.get("https://test-fe.mysellerpintar.com/api/categories"); 
          // setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [useDummyData]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "all" ? undefined : selectedValue);
    onFilterChange(selectedValue === "all" ? undefined : selectedValue);
  };

  return (
    <select
      className="px-8 py-2 text-left border-white rounded text-black bg-white focus:outline-none focus:border-blue-500"
      value={selectedCategory || "all"}
      onChange={handleCategoryChange}
    >
      <option value="all" className="text-black">Select category</option>
      {categories.map((category) => (
        <option className="text-black" key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;