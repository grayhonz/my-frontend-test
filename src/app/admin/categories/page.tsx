// src/app/admin/categories/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar";
import UserMenu from "../components/UserMenu";
import useCategories from "./hooks/useCategories";
import CategoryFilter from "./components/CategoryFilter";
import CategoryCard from "./components/CategoryCard";
import AddCategoryModal from "./components/AddCategoryModal";
import Pagination from "./components/Pagination"; // Import Pagination component

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    categories,
    totalCategories,
    totalPages,
    loading,
    error,
  } = useCategories({
    query: searchTerm,
    page: currentPage,
  });

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-black">Category</h1>
          <UserMenu user={{ name: "James Dean", initial: "J" }} onLogout={() => console.log("Logout")} />
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                Total Category: <span className="font-medium">{totalCategories}</span>
              </div>
              <div className="flex items-center space-x-4">
                <CategoryFilter onChange={setSearchTerm} />
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Category
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <CategoryCard key={index} category={category} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategoryModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}