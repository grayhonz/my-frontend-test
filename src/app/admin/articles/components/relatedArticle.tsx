// src/app/article/components/RelatedArticles.tsx
// import ArticleCard from "./ArticleCard";
import Image from "next/image";
import useArticles from "../hooks/useArticles";

interface RelatedArticlesProps {
  excludeId: string;
}

const RelatedArticles = ({ excludeId }: RelatedArticlesProps) => {
  const { articles, loading, error } = useArticles({ useDummyData: true });

  if (loading) {
    return <p className="text-gray-500 text-center mt-8">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-8">
        Error: {error}
      </p>
    );
  }

  const relatedArticles = articles
    .filter(article => article.id !== excludeId)
    .slice(0, 3);

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold mb-4 text-[#475569]">
        Other articles
      </h2>
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {relatedArticles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-48">
              <Image 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-[#64748B] mb-1">
                {new Date(article.date).toLocaleDateString()}
              </p>
              <h3 className="text-base font-semibold mb-2">
                {article.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.categories.slice(0,2).map((cat) => (
                  <span 
                    key={cat} 
                    className="px-2 py-1 text-[#2F62F0] bg-[#E0E7FF] text-xs rounded-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;