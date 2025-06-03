"use client";
import React, { useState } from "react";
import useArticles from "./hooks/useArticles";
import ArticleCard from "./components/ArticleCard";
import CategoryFilter from "./components/CategoryFilter";
import SearchInput from "./components/SearchInput";
import Pagination from "./components/Pagination";
import UserMenu from "./components/UserMenu";
import LogoutModal from "./components/LogoutModal";
import Image from "next/image";

const ArticleListPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const { articles, totalPages, loading, error } = useArticles({
    query,
    category,
    page: currentPage,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory: string | undefined) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const user = {
    name: "James Dean",
    initial: "J",
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    // TODO: Redirect to login page
  };

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

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
        <header className="relative bg-blue-600 text-white">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/background-article.jpg"
              alt="Header Background"
              layout="fill"
              objectFit="cover"
              className="opacity-40"
            />
          </div>

          {/* Konten Header */}
          <div className="relative z-10 w-full">
            {/* Logo */}
            <div className="flex justify-start px-6 pt-4">
              <a href="#" className="block w-12 h-12 bg-white rounded-full shadow-md" />
            </div>

            {/* Judul dan UserMenu */}
            <div className="container mx-auto px-6 py-6 flex flex-col items-center justify-center text-center">
              <h5 className="text-3xl md:text-1l font-bold leading-tight">
                Blog Genzet
              </h5>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                The Journal : Design Resources, <br></br>Interviews, and Industry News
              </h1>
              <p className="text-lg md:text-xl mt-2 max-w-2xl">
                Your daily dose of design insights!
              </p>

              {/* Filter + Search */}
              <div className="bg-blue-700 p-2 rounded-md">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <CategoryFilter onFilterChange={handleCategoryChange} />
                  <SearchInput onSearch={handleSearch} />
                </div>
              </div>
            </div>

            {/* UserMenu (kanan atas) */}
            <div className="absolute top-4 right-6">
              <UserMenu user={user} onLogout={handleLogout} />
            </div>
          </div>
        </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Articles */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles
            .slice((currentPage - 1) * 9, currentPage * 9)
            .map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-6 text-center">
        <p className="text-sm">© 2025 Blog genzet. All rights reserved.</p>
      </footer>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default ArticleListPage;
