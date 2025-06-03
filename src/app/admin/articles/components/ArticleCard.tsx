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
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 max-w-2xl mx-auto">
      {/* Gambar Artikel */}
      <div className="flex justify-center items-center bg-gray-100">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={600}
          height={400}
          className="w-full max-w-xl h-64 object-cover rounded"
        />
      </div>

      {/* Konten Artikel */}
      <div className="p-4 text-left text-gray-800">
        {/* Judul Artikel */}
        <h3 className="text-xl font-bold mb-2 text-center">{article.title}</h3>
        
        {/* Deskripsi Pendek */}
        <p className="mb-4 leading-relaxed">
          {article.description}
        </p>

        {/* Tombol Read More */}
        <div className="text-center mb-2">
          <a href={`/admin/article/${article.id}`} className="text-blue-500 hover:text-blue-700">
            Read More
          </a>
        </div>

        {/* Kategori */}
        <div className="flex flex-wrap justify-center space-x-2 mt-2">
          {article.categories.map((category) => (
            <span
              key={category}
              className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2"
            >
              <AiOutlineTag className="inline mr-1" /> {category}
            </span>
          ))}
        </div>
      </div>
    </div>

  );
};

export default ArticleCard;