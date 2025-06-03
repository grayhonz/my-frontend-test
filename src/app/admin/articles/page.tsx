"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useArticles from "./hooks/useArticles";
import CategoryFilter from "./components/CategoryFilter";
import SearchInput from "./components/SearchInput";
import Pagination from "./components/Pagination";
import Sidebar from "../components/sidebar";
import UserMenu from "../components/UserMenu";
import LogoutModal from "./components/LogoutModal";
import DeleteModal from "./components/DeleteModal";
import Image from "next/image";

const AdminArticlesPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const { articles, totalPages, loading, error } = useArticles({ query, category, page: currentPage });

  const user = {
    name: "James Dean",
    initial: "J",
  };

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
  
  const handleDeleteClick = (id: string) => {
    setSelectedArticleId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedArticleId) {
      // TODO: panggil API hapus artikel di sini
      console.log("Deleting article:", selectedArticleId);
      // setelah hapus, reset dan tutup modal
      setSelectedArticleId(null);
      setShowDeleteModal(false);
    }
  };

  const handleLogout = () => setShowLogoutModal(true);
  const handleCloseModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    // TODO: Tambahkan redirect ke halaman login
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="w-full flex justify-between items-center px-6 py-4 bg-[#E9F0FF] border-b border-[#D9E2F9]">
          <h1 className="text-lg font-semibold text-black">Articles</h1>
          <UserMenu user={user} onLogout={handleLogout} />
        </header>

        <div className="flex flex-wrap justify-between items-center px-6 py-4 gap-4">
          <CategoryFilter onFilterChange={handleCategoryChange} />
          <SearchInput onSearch={handleSearch} />
          <button
            onClick={() => router.push("/admin/articles/create")}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            + Add Article
          </button>
        </div>

        <div className="px-6 flex-1 overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left text-black">Thumbnail</th>
                <th className="py-2 px-4 text-left text-black">Title</th>
                <th className="py-2 px-4 text-left text-black">Category</th>
                <th className="py-2 px-4 text-left text-black">Created at</th>
                <th className="py-2 px-4 text-left text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="py-2 px-4">
                    <Image src={article.imageUrl} width={600} height={400} alt="Thumbnail" className="w-24 h-auto rounded" />
                  </td>
                  <td className="py-2 px-4 text-black">{article.title}</td>
                  <td className="py-2 px-4 text-black">{article.categories.join(", ")}</td>
                  <td className="py-2 px-4 text-black">{article.date}</td>
                  <td className="py-2 px-4 space-x-2 text-black">
                    <button
                      onClick={() => router.push(`/admin/articles/${article.id}`)}
                      className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
                      className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(article.id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
      
    </div>
  );
};

export default AdminArticlesPage;
