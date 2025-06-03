// src/components/CreateArticle.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  thumbnail: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CreateArticle: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Logic submit artikel disini
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-black">Create Articles</h1>
      </div>

      {/* Thumbnails */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-black">Thumbnails</label>
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
          onClick={() => document.getElementById('thumbnail-input')?.click()}
        >
          {thumbnailPreview ? (
            <img src={thumbnailPreview} alt="Preview" className="w-full h-40 object-cover rounded" />
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto text-gray-400">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Klik untuk memilih file <br />
                <span className="text-xs text-gray-400">Format: jpg atau png</span>
              </p>
            </>
          )}
        </div>
        <input
          id="thumbnail-input"
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleFileChange}
          {...register("thumbnail")}
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black">Title</label>
        <input
          type="text"
          placeholder="Input title"
          className={`w-full px-3 py-2 border placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black">Category</label>
        <select
          className={`w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          {...register("category")}
        >
          <option value="">Pilih kategori</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          The existing category list can be seen in the <strong>category</strong> menu
        </p>
      </div>

      {/* Content */}
      <div className="mb-6">
        {/* Toolbar */}
        <div className="flex items-center   mb-2 space-x-2">
          <button className="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2z"></path>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"></path>
              <path d="M17 3a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14"></path>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"></path>
              <path d="M17 3a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14"></path>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M10 13a5 5 0 015 5H9a5 5 0 015-5zm0-6a5 5 0 00-5 5h14a5 5 0 00-5-5z"></path>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M8 9l3 3-3 3"></path>
              <path d="M15 9l3 3-3 3"></path>
            </svg>
          </button>
        </div>
        <textarea
          placeholder="Type a content..."
          rows={10}
          className={`w-full px-3 py-2 border placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
          {...register("content")}
        ></textarea>
        {errors.content ? (
          <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
        ) : (
          <p className="mt-1 text-sm text-gray-500">0 Words</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
            <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
                Cancel
            </button>
            <button
                type="button"
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
            >
                Preview
            </button>
            <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Upload
            </button>
            </div>
    </div>
  );
};

export default CreateArticle;