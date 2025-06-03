// src/app/admin/articles/components/ArticleRow.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ArticleRowProps {
  article: {
    id: string;
    thumbnail: string;
    title: string;
    category: string;
    createdAt: string;
  };
}

const ArticleRow = ({ article }: ArticleRowProps) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 px-4">
        <Image src={article.thumbnail} width={600} height={400} alt={article.title} className="w-16 h-16 rounded" />
      </td>
      <td className="py-2 px-4">
        <span>{article.title}</span>
      </td>
      <td className="py-2 px-4">
        <span>{article.category}</span>
      </td>
      <td className="py-2 px-4">
        <span>{article.createdAt}</span>
      </td>
      <td className="py-2 px-4">
        <Link href={`/admin/articles/${article.id}`} className="text-blue-500 hover:text-blue-600">
          Preview
        </Link>
        <Link href={`/admin/articles/${article.id}/edit`} className="text-orange-500 hover:text-orange-600 ml-2">
          Edit
        </Link>
        <button className="text-red-500 hover:text-red-600 ml-2">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ArticleRow;