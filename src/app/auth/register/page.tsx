"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
// import axios from "axios";   Axios di gunakan untuk fetch api

// Define validation schema
const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(/(?=.*[@$!%*?&])/, "Password must contain at least one special character"),
  role: z.enum(["User", "Admin"], {
    invalid_type_error: "Role must be either 'User' or 'Admin'",
  }),
});

type FormData = z.infer<typeof schema>;

// Dummy data
const dummyData = [
  { username: "user1", password: "Password1@", role: "User" },
  { username: "admin1", password: "AdminPassword1@", role: "Admin" },
];

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  // State for loading and messages
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle registration submission
  const handleRegister = async (data: FormData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Check if the data matches any of the dummy data
    const userExists = dummyData.some(
      (dummy) =>
        dummy.username === data.username &&
        dummy.password === data.password &&
        dummy.role === data.role
    );

    if (userExists) {
      try {
        // Simulate API call (commented out to avoid actual API request)
        // const response = await axios.post(
        //   "https://test-fe.mysellerpintar.com/auth/register", 
        //   data
        // );

        // Simulate successful registration without calling the API
        console.log("Registration successful:", data);
        setSuccessMessage("Registrasi berhasil! Redirecting...");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      } catch (error) {
        console.error("Registration failed:", error);
        // Type assertion to access error.response
        const axiosError = error as { response?: { status: number } };
        if (axiosError.response && axiosError.response.status === 400) {
          setErrorMessage("Registrasi gagal. Mohon periksa input Anda.");
        } else {
          setErrorMessage("Registrasi gagal. Silakan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrorMessage("Registrasi gagal. Data tidak cocok dengan data dummy.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="text-center mb-4">
          <Image
            src="https://via.placeholder.com/150"        // Replace with your logo path
            alt="Logo"
            width={150}
            height={150}
            className="w-16 h-16 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-black">Register</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Input username"
              {...register("username")}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500 text-black ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Input password"
                {...register("password")}
                className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500 text-black ${
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
            <label htmlFor="role" className="block text-sm font-medium text-black">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500 text-black ${
                errors.role ? "border-red-500" : ""
              }`}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Button Register */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Register"
            )}
          </button>

          {/* Error Message */}
          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="mt-2 text-sm text-green-500">{successMessage}</p>
          )}
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;