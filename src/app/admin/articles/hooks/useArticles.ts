// src/app/admin/articles/hooks/useArticles.ts
import { useState, useEffect, useCallback } from "react";
// import axios from "axios"; // Uncomment if consuming API

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  categories: string[];
}

interface UseArticlesProps {
  query?: string;
  category?: string;
  page?: number;
  useDummyData?: boolean;
}

// Move dummyArticles outside the hook to avoid recreating every render
const dummyArticles: Article[] = [
  {
    id: "1",
    title: "Designing the Future",
    description: "Explore the latest trends in design...",
    imageUrl: "/image.jpg",
    date: "2023-10-01",
    categories: ["Design", "Trends"],
  },
  {
    id: "2",
    title: "Interview with John Doe",
    description: "An interview with the renowned designer.",
    imageUrl: "https://via.placeholder.com/600x400",
    date: "2023-09-15",
    categories: ["Interview", "People"],
  },
  // ... (remaining dummy articles)
];

const useArticles = ({ query, category, page = 1, useDummyData = true }: UseArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyFiltersAndSearch = useCallback((articles: Article[]) => {
    let filtered = articles;

    if (category) {
      filtered = filtered.filter(article => article.categories.includes(category));
    }

    if (query) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    const articlesPerPage = 10;
    const startIndex = (page - 1) * articlesPerPage;
    const paginatedArticles = filtered.slice(startIndex, startIndex + articlesPerPage);

    setFilteredArticles(paginatedArticles);
    setTotalPages(Math.ceil(filtered.length / articlesPerPage));
  }, [category, query, page]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetchedArticles: Article[] = [];

        if (useDummyData) {
          fetchedArticles = dummyArticles;
        } else {
          // const response = await axios.get(
          //   `https://test-fe.mysellerpintar.com/api/articles?page=${page}&query=${query || ""}&category=${category || ""}`
          // );
          // fetchedArticles = response.data.articles || [];
        }

        setArticles(fetchedArticles);
        applyFiltersAndSearch(fetchedArticles);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setArticles([]);
        setFilteredArticles([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, category, page, useDummyData, applyFiltersAndSearch]);

  useEffect(() => {
    applyFiltersAndSearch(articles);
  }, [articles, applyFiltersAndSearch]);

  return { articles: filteredArticles, totalPages, loading, error };
};

export default useArticles;
