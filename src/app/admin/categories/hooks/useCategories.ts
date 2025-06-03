// src/app/admin/categories/hooks/useCategories.ts

import { useState, useEffect } from "react";
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
  {
    id: "1",
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "2",
    name: "Design",
    createdAt: "April 13, 2025 10:55:12",
  },
  // ... tambahkan data dummy lainnya
  // Misalnya, tambahkan 20 kategori dummy untuk pengujian pagination
  {
    id: "3",
    name: "Science",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "4",
    name: "Mathematics",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "5",
    name: "History",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "6",
    name: "Art",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "7",
    name: "Music",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "8",
    name: "Literature",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "9",
    name: "Physics",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "10",
    name: "Chemistry",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "11",
    name: "Biology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "12",
    name: "Geography",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "13",
    name: "Economics",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "14",
    name: "Psychology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "15",
    name: "Sociology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "16",
    name: "Philosophy",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "17",
    name: "Engineering",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "18",
    name: "Medicine",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "19",
    name: "Law",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: "20",
    name: "Education",
    createdAt: "April 13, 2025 10:55:12",
  },
];

const useCategories = ({ query = "", page = 1 }: UseCategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyFiltersAndPagination = (rawCategories: Category[]) => {
    let filtered = rawCategories;

    // Filter berdasarkan query (search)
    if (query) {
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Paginasi
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

    setFilteredCategories(paginated);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (true) { // Gunakan data dummy
          setCategories(dummyCategories);
          applyFiltersAndPagination(dummyCategories);
        } else {
          // Ambil data dari API
          const token = localStorage.getItem("authToken");
          if (!token) throw new Error("Token tidak ditemukan");

          const response = await axios.get(
            `https://test-fe.mysellerpintar.com/api/categories?page=${page}&query=${query}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setCategories(response.data.categories);
          applyFiltersAndPagination(response.data.categories);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setFilteredCategories([]);
        setTotalPages(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query, page]);

  useEffect(() => {
    applyFiltersAndPagination(categories);
  }, [categories, query, page]);

  return {
    categories: filteredCategories,
    totalCategories: categories.length,
    totalPages,
    loading,
    error,
  };
};

export default useCategories;