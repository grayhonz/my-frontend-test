// src/app/article/[id]/page.tsx
"use client";
import React from "react";
import { useParams } from "next/navigation";
import useArticleById from "../hooks/useArticleById";
import ArticleDetail from "../components/ArticleDetail";
import RelatedArticles from "../components/RelatedArticles";
import UserMenu from "../components/UserMenu";
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
      <header className="relative bg-blue-600 text-white">
        <div className="absolute inset-0">
          <Image
            src="/background-article.jpg"
            alt="Header Background"
            width={600} 
            height={400}
            style={{ objectFit: "cover" }}
            className="opacity-40"
          />
        </div>
        <div className="relative z-10 p-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              The Journal
            </h1>
            <p className="text-lg md:text-xl mt-2">
              Design Resources, Interviews, and Industry News
            </p>
          </div>
          <UserMenu user={{ name: "James Dean", initial: "J" }} onLogout={() => {}} />
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Article Detail */}
        <ArticleDetail article={article} />
        {/* Related Articles */}
        <RelatedArticles excludeId={article.id} />
      </main>
      {/* Footer */}
      <footer className="bg-blue-700 text-white p-6 text-center">
        <p className="text-sm">© 2025 Blog genzet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ArticleByIdPage;