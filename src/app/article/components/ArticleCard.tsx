// src/app/article/components/ArticleCard.tsx
import Image from "next/image";
import { AiOutlineTag } from "react-icons/ai";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    categories: string[];
  };
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Gambar Artikel */}
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={600}
        height={400}
        className="w-full h-64 object-cover"
      />
      {/* Konten Artikel */}
      <div className="p-4">
        {/* Judul Artikel */}
        <h3 className="text-xl font-bold text-black mb-2">{article.title}</h3>
        {/* Deskripsi Pendek */}
        <p className="text-gray-700 mb-4">{article.description}</p>
        {/* Tombol Read More */}
        <a href={`/article/${article.id}`} className="text-blue-500 hover:text-blue-700">
          Read More
        </a>
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
    </div>
  );
};

export default ArticleCard;