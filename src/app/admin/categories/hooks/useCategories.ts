import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface UseCategoriesProps {
  query?: string;
  page?: number;
}

const dummyCategories: Category[] = [
  { id: "1", name: "Technology", createdAt: "April 13, 2025 10:55:12" },
  { id: "2", name: "Design", createdAt: "April 13, 2025 10:55:12" },
  { id: "3", name: "Science", createdAt: "April 13, 2025 10:55:12" },
  { id: "4", name: "Mathematics", createdAt: "April 13, 2025 10:55:12" },
  { id: "5", name: "History", createdAt: "April 13, 2025 10:55:12" },
  { id: "6", name: "Art", createdAt: "April 13, 2025 10:55:12" },
  { id: "7", name: "Music", createdAt: "April 13, 2025 10:55:12" },
  { id: "8", name: "Literature", createdAt: "April 13, 2025 10:55:12" },
  { id: "9", name: "Physics", createdAt: "April 13, 2025 10:55:12" },
  { id: "10", name: "Chemistry", createdAt: "April 13, 2025 10:55:12" },
  { id: "11", name: "Biology", createdAt: "April 13, 2025 10:55:12" },
  { id: "12", name: "Geography", createdAt: "April 13, 2025 10:55:12" },
  { id: "13", name: "Economics", createdAt: "April 13, 2025 10:55:12" },
  { id: "14", name: "Psychology", createdAt: "April 13, 2025 10:55:12" },
  { id: "15", name: "Sociology", createdAt: "April 13, 2025 10:55:12" },
  { id: "16", name: "Philosophy", createdAt: "April 13, 2025 10:55:12" },
  { id: "17", name: "Engineering", createdAt: "April 13, 2025 10:55:12" },
  { id: "18", name: "Medicine", createdAt: "April 13, 2025 10:55:12" },
  { id: "19", name: "Law", createdAt: "April 13, 2025 10:55:12" },
  { id: "20", name: "Education", createdAt: "April 13, 2025 10:55:12" },
];

const useCategories = ({ query = "", page = 1 }: UseCategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyFiltersAndPagination = useCallback(
    (rawCategories: Category[]) => {
      let filtered = rawCategories;

      if (query) {
        filtered = filtered.filter((cat) =>
          cat.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      const itemsPerPage = 10;
      const startIndex = (page - 1) * itemsPerPage;
      const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

      setFilteredCategories(paginated);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    },
    [query, page]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (true) {
          // Gunakan dummy data
          setCategories(dummyCategories);
          if (isMounted) {
            applyFiltersAndPagination(dummyCategories);
          }
        } else {
          const token = localStorage.getItem("authToken");
          if (!token) throw new Error("Token tidak ditemukan");

          const response = await axios.get(
            `https://test-fe.mysellerpintar.com/api/categories?page=${page}&query=${query}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (isMounted) {
            setCategories(response.data.categories);
            applyFiltersAndPagination(response.data.categories);
          }
        }
      } catch (err) {
        const error = err as Error;
        if (isMounted) {
          setError(error.message);
          setFilteredCategories([]);
          setTotalPages(1);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query, page, applyFiltersAndPagination]);

  useEffect(() => {
    applyFiltersAndPagination(categories);
  }, [categories, applyFiltersAndPagination]);

  return {
    categories: filteredCategories,
    totalCategories: query ? filteredCategories.length : categories.length, // perbaikan di sini
    totalPages,
    loading,
    error,
  };
};

export default useCategories;
