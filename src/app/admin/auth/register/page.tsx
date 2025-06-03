// src/app/admin/auth/register/page.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Menggunakan <Image /> dari next/image
import z from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
  role: z.literal("admin"),
});

type FormData = z.infer<typeof schema>;

const AdminRegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleRegister = async (data: FormData) => {
    try {
      await axios.post(
        "https://test-fe.mysellerpintar.com/api/auth/register", 
        data
      );
      alert("Registration berhasil! Redirecting...");
      router.push("/admin/auth/login"); // Redirect ke halaman login
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registrasi gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          {/* Mengganti <img> dengan <Image /> */}
          <Image
            src="https://via.placeholder.com/150" 
            alt="Logo"
            width={150}
            height={150}
            className="w-16 h-16 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold">Admin Register</h2>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Input username"
              {...register("username")}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500 ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Input email"
              {...register("email")}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Input phone number"
              {...register("phone")}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Input password"
                {...register("password")}
                className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button Register */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/admin/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;