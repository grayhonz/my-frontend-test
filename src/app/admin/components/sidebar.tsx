"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // router.push("/admin/auth/login");
  };

  return (
    <aside className="w-56 bg-[#2F62F0] text-white flex flex-col p-6 min-h-screen">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8 select-none">
        <Image
          src="/"
          alt="Logo icon white hexagonal shape"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="font-semibold text-lg">Logoipsum</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 text-sm font-medium">
        <Link
          href="/admin/articles"
          className="flex items-center space-x-2 bg-[#3D6CF0] rounded-md px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
          >
            <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2z" />
          </svg>
          <span>Articles</span>
        </Link>
        <Link
          href="/admin/categories"
          className="flex items-center space-x-2 hover:bg-[#3D6CF0] rounded-md px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
          >
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3h-4a2 2 0 00-2 2v2h8V5a2 2 0 00-2-2z" />
          </svg>
          <span>Category</span>
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center space-x-2 px-4 py-2 hover:bg-[#1E40AF] rounded text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
        </svg>
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;