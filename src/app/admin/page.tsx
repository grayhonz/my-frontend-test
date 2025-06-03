// src/app/admin/layout.tsx
"use client";

import React from "react";
import Sidebar from "./components/sidebar";
import UserMenu from "./components/UserMenu";
import { useRouter } from "next/navigation";
import Image from "next/image";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // Simulasi data pengguna yang sudah login
  const user = {
    name: "James Dean",
    initial: "J",
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/auth/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 p-4">
        <header className="bg-white border-b border-gray-200 mb-4">
          <div className="flex items-center justify-between">
            <Image
              src="https://via.placeholder.com/150" 
              alt="Logo"
              width={150}
              height={150}
              className="w-16 h-16 mx-auto"
            />
            <UserMenu user={user} onLogout={handleLogout} />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;