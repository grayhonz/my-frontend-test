// src/app/article/components/ArticleDetail.tsx
import Image from "next/image";
import { AiOutlineTag } from "react-icons/ai";

interface ArticleDetailProps {
  article: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    content: string;
    categories: string[];
  };
}

const ArticleDetail = ({ article }: ArticleDetailProps) => {
  return (
    <div>
      {/* Metadata */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {article.date} • Created by Admin
        </p>
      </div>
      {/* Judul Artikel */}
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      {/* Gambar Artikel */}
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={700}
        height={400}
        className="w-full h-96 object-cover mb-4"
      />
      {/* Konten Artikel */}
      <div className="mb-4" dangerouslySetInnerHTML={{ __html: article.content }} />
      {/* Kategori */}
      <div className="flex space-x-2 mt-2">
        {article.categories.map((category) => (
          <span
            key={category}
            className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold mr-2"
          >
            <AiOutlineTag className="inline" /> {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;