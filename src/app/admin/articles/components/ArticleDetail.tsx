
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
    categories: string[];
  };
}

const ArticleDetail = ({ article }: ArticleDetailProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Metadata */}
      <div className="flex items-center justify-between mb-4 text-center text-sm text-gray-500">
        <p className="w-full">{article.date} • Created by Admin</p>
      </div>

      {/* Judul Artikel */}
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        {article.title}
      </h1>

      {/* Gambar Artikel */}
      <div className="w-full h-96 relative mb-6">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Konten Artikel */}
      <div
        className="mb-6 text-black text-justify"
        dangerouslySetInnerHTML={{ __html: article.description }}
      />

      {/* Kategori */}
      <div className="flex justify-center flex-wrap gap-2 mt-2">
        {article.categories.map((category) => (
          <span
            key={category}
            className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1"
          >
            <AiOutlineTag /> {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;