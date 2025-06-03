// src/app/article/[id]/page.tsx
"use client";
import React from "react";
import { useParams } from "next/navigation";
import useArticleById from "../hooks/useArticleById";
import ArticleDetail from "../components/ArticleDetail";
import RelatedArticles from "../components/RelatedArticles";
import UserMenu from "../../../article/components/UserMenu";
import Image from "next/image";

const ArticleByIdPage = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticleById(id as string);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto p-4">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/frame-auth.png" // Ganti dengan path logo Anda
              alt="Logo"
              width={100}
              height={30}
              className="object-contain"
            />
          </div>
          <UserMenu user={{ name: "James Dean", initial: "J" }} onLogout={() => {}} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ArticleDetail article={article} />
        <RelatedArticles excludeId={article.id} />
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-6 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>© 2025 Blog genzet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticleByIdPage;