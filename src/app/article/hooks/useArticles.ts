
// src/app/article/hooks/useArticles.ts
import { useState, useEffect } from "react";
// import axios from "axios";

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
  useDummyData?: boolean; // New prop to toggle dummy data
}

const useArticles = ({ query, category, page = 1, useDummyData = true }: UseArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dummy data
  const dummyArticles: Article[] = [
    {
      id: "1",
      title: "Designing the Future",
      description: "Explore the latest trends in design.",
      imageUrl: "/image (1).jpg", 
      date: "2023-10-01",
      categories: ["Design", "Trends"],
    },
    {
      id: "2",
      title: "Interview with John Doe",
      description: "An interview with the renowned designer.",
      imageUrl: "/image (2).jpg", 
      date: "2023-09-15",
      categories: ["Interview", "People"],
    },
    {
      id: "3",
      title: "Advanced UI/UX Techniques",
      description: "Learn about advanced techniques in UI/UX design.",
      imageUrl: "/image (3).jpg", 
      date: "2023-08-20",
      categories: ["Design", "Techniques"],
    },
    {
      id: "4",
      title: "The Importance of Accessibility",
      description: "Why accessibility is crucial in web design.",
      imageUrl: "/image.jpg", 
      date: "2023-07-10",
      categories: ["Accessibility", "Design"],
    },
    {
      id: "5",
      title: "Responsive Web Design",
      description: "Creating responsive designs for all devices.",
      imageUrl: "/image (4).jpg", 
      date: "2023-06-25",
      categories: ["Design", "Responsive"],
    },
    {
      id: "6",
      title: "Design Thinking",
      description: "Understanding the principles of design thinking.",
      imageUrl: "/image (5).jpg", 
      date: "2023-06-10",
      categories: ["Design", "Thinking"],
    },
    {
      id: "7",
      title: "Web Performance Optimization",
      description: "Tips for optimizing web performance.",
      imageUrl: "/image (6).jpg", 
      date: "2023-05-20",
      categories: ["Performance", "Optimization"],
    },
    {
      id: "8",
      title: "Color Theory in Design",
      description: "Applying color theory in design projects.",
      imageUrl: "/image (7).jpg", 
      date: "2023-05-05",
      categories: ["Design", "Color Theory"],
    },
    {
      id: "9",
      title: "User Experience Design",
      description: "Improving user experience in digital products.",
      imageUrl: "/image1.jpg", 
      date: "2023-04-20",
      categories: ["Design", "UX"],
    },
    {
      id: "10",
      title: "Design Systems",
      description: "Building scalable design systems.",
      imageUrl: "https://via.placeholder.com/600x400", 
      date: "2023-04-10",
      categories: ["Design", "Systems"],
    },
    {
      id: "11",
      title: "Typography in Design",
      description: "Using typography effectively in design.",
      imageUrl: "https://via.placeholder.com/600x400", 
      date: "2023-03-25",
      categories: ["Design", "Typography"],
    },
    {
      id: "12",
      title: "Visual Hierarchy",
      description: "Creating effective visual hierarchies.",
      imageUrl: "https://via.placeholder.com/600x400", 
      date: "2023-03-10",
      categories: ["Design", "Hierarchy"],
    },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedArticles: Article[] = [];
        if (useDummyData) {
          // Use dummy data
          fetchedArticles = dummyArticles;
        } else {
          // Fetch from API
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
  }, [query, category, page, useDummyData]);

  const applyFiltersAndSearch = (articles: Article[]) => {
    let filtered = articles;

    // Apply category filter
    if (category) {
      filtered = filtered.filter(article => article.categories.includes(category));
    }

    // Apply search query
    if (query) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Set filtered articles and total pages
    setFilteredArticles(filtered);
    setTotalPages(Math.ceil(filtered.length / 9)); // Assuming 9 articles per page
  };

  useEffect(() => {
    applyFiltersAndSearch(articles);
  }, [articles, query, category]);

  return { articles: filteredArticles, totalPages, loading, error };
};

export default useArticles;
