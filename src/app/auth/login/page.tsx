"use client";

// src/app/auth/login/page.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async (data: FormData) => {
    try {
      // Simulasi API call
      console.log("Logging in with:", data);
      // Redirect ke halaman list artikel setelah login sukses
      alert("Login berhasil! Redirecting...");
      // TODO: Implementasi API login sesungguhnya
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          <Image
            src="https://via.placeholder.com/150" 
            alt="Logo"
            width={150}
            height={150}
            className="w-16 h-16 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold">Login</h2>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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

          {/* Button Login */}
            <Link href="/article" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </Link>
        </form>
        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;