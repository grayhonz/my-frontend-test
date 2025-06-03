// src/app/admin/articles/create/page.tsx
"use client";

import React from "react";
import Sidebar from "../../components/sidebar";
import UserMenu from "../../components/UserMenu";
import CreateArticle from "../components/CreateArtikel";

const CreateArticlePage: React.FC = () => {
  const user = {
    name: "James Dean",
    initial: "JD",
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header with User Menu */}
        <div className="w-full flex justify-between items-center px-6 py-4 bg-[#E9F0FF] border-b border-[#D9E2F9]">
          <h1 className="text-xl font-semibold text-black">Articles</h1>
          <UserMenu user={user} onLogout={() => console.log("Logout")} />
        </div>

        {/* Article Creation Form */}
        <CreateArticle />
      </div>
    </div>
  );
};

export default CreateArticlePage;