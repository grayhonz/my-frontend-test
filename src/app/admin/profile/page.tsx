
// src/app/admin/profile/page.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import UserMenu from "../components/UserMenu";
import LogoutModal from "../articles/components/LogoutModal";

const UserProfilePage = () => {
  const user = {
    username: "James Dean",
    password: "Admin123",
    role: "Admin",
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
    window.location.href = "/auth/login"; // Atau pakai next/router untuk redirect
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      <Sidebar />
        <main className="flex-1 flex flex-col">
          {/* Top bar */}
          <div className="flex justify-between items-center p-4 border-b bg-white">
            <div className="text-lg font-bold text-black">User Profile</div>
            <div className="flex items-center space-x-2">
              <UserMenu
                user={{ name: user.username, initial: user.initial }}
                onLogout={handleLogout}
              />
            </div>
          </div>

          {/* Profile content */}
          <div className="mt-5 ml-5 mr-5 bg-white flex-grow rounded-lg p-6">
            <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
              <h2 className="text-xl pt-10 text-black font-semibold mb-4">User Profile</h2>
              <div className="w-16 h-16 rounded-full bg-blue-200 text-blue-800 font-bold flex items-center justify-center text-lg mb-6">
                {user.initial}
              </div>

              <div className="space-y-3 w-full max-w-xs">
                <div className="grid grid-cols-[1fr_auto_1fr] bg-gray-100 px-4 py-2 rounded items-center">
                  <span className="font-semibold text-black text-left">Username</span>
                  <span className="text-black">:</span>
                  <span className="text-black">{user.username}</span>
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] bg-gray-100 px-4 py-2 rounded items-center">
                  <span className="font-semibold text-black text-left">Password</span>
                  <span className="text-black">:</span>
                  <span className="text-black">••••••••</span>
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] bg-gray-100 px-4 py-2 rounded items-center">
                  <span className="font-semibold text-black text-left">Role</span>
                  <span className="text-black">:</span>
                  <span className="text-black">{user.role}</span>
                </div>
              </div>

              <Link
                href="/admin/articles"
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
              >
                Back to home
              </Link>
            </div>
          </div>
        </main>
      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default UserProfilePage;