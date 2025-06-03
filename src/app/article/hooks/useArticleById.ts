// src/app/article/hooks/useArticleById.ts
import { useState, useEffect } from "react";
import useArticles from "./useArticles";

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  categories: string[];
}

const useArticleById = (id: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { articles } = useArticles({ useDummyData: true });

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const foundArticle = articles.find(a => a.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        throw new Error("Article not found");
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, [id, articles]);

  return { article, loading, error };
};

export default useArticleById;