// src/app/userProfile/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import UserMenu from "../article/components/UserMenu";
import LogoutModal from "../article/components/LogoutModal";

const UserProfile = () => {
  const user = {
    name: "James Dean",
    initial: "J", // Ini diperlukan oleh UserMenu
    password: "Admin123",
    role: "User",
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
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Topbar */}
      <div className="flex justify-between items-center p-4 border-b bg-blue-600">
        <div className="text-lg font-bold text-white">Logoipsum</div>
        <div className="flex items-center space-x-2">
          <UserMenu
            user={{ name: user.name, initial: user.initial }}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Profile content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
        <h2 className="text-xl text-black font-semibold mb-4">User Profile</h2>
        <div className="w-16 h-16 rounded-full bg-blue-200 text-blue-800 font-bold flex items-center justify-center text-lg mb-6">
          {user.initial}
        </div>

          <div className="space-y-3 w-full max-w-xs">
            <div className="grid grid-cols-[1fr_auto_1fr] bg-gray-100 px-4 py-2 rounded items-center">
              <span className="font-semibold text-black text-left">Username</span>
              <span className="text-black">:</span>
              <span className="text-black">{user.name}</span>
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
          href="/article"
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
        >
          Back to home
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-sm text-center py-4">
        <div className="font-semibold">Logoipsum</div>
        <div>© 2025 Blog genzet. All rights reserved.</div>
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

export default UserProfile;