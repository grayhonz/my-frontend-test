// src/app/article/components/RelatedArticles.tsx
import ArticleCard from "./ArticleCard";
import useArticles from "../hooks/useArticles";

interface RelatedArticlesProps {
  excludeId: string; // ID artikel yang ingin diexclude
}

const relatedArticles = ({ excludeId }: RelatedArticlesProps) => {
  const { articles, loading, error } = useArticles({ useDummyData: true });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Filter dan ambil hanya 3 artikel teratas
  const relatedArticles = articles
    .filter(article => article.id !== excludeId)
    .slice(0, 3);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Other articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default relatedArticles;