
// src/app/article/components/ArticleDetail.tsx edit nama article detail
import Image from "next/image";

interface ArticleDetailProps {
  article: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    categories: string[];
  };
}

const ArticleDetail = ({ article }: ArticleDetailProps) => {
  return (
    <div className="space-y-6">
      {/* Metadata */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <p className="text-sm text-gray-600">
          {article.date} • Created by Admin
        </p>
      </div>

      {/* Judul Artikel */}
      <h1 className="text-4xl md:text-5xl text-black font-bold leading-tight mb-6">{article.title}</h1>

      {/* Gambar Artikel */}
      <div className="md:flex md:items-start md:space-x-6 mb-8">
        <div className="w-full md:w-1/2">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={700}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          {/* Konten Artikel */}
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </div>
      </div>

      {/* Other Articles Section */}
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* RelatedArticles akan di-render di sini */}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

