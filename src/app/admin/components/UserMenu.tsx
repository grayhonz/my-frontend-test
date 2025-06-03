// src/app/admin/components/UserMenu.tsx
import React, { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

interface User {
  name: string;
  initial: string; // Inisial dari nama pengguna
}

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-black hover:text-blue-300 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
          {user?.initial}
        </div>
        <span>{user?.name}</span>
        <FiChevronDown className="text-sm" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
          <Link href="/admin/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
            My Profile
          </Link>
          <button
            onClick={onLogout}
            className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;