// src/app/components/UserAvatar.tsx
import React from "react";

interface User {
  name: string;
  initial: string; // Inisial dari nama pengguna
  hugs: number; // Jumlah Hug
}

interface UserAvatarProps {
  user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
        {user.initial}
      </div>
      <p className="text-lg font-medium">{user.name}</p>
    </div>
  );
};

export default UserAvatar;