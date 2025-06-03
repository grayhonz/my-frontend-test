"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const schema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  thumbnail: z.any().optional(), // Jangan pakai string karena kita pakai File di input
});

type FormData = z.infer<typeof schema>;

const CreateArticle: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Tambahkan logika submit ke server di sini
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Simpan file ke form state (bukan event.target.value)
      setValue("thumbnail", file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-black">Create Article</h1>
      </div>

      {/* Thumbnail Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-black">Thumbnail</label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
          onClick={() => document.getElementById("thumbnail-input")?.click()}
        >
          {thumbnailPreview ? (
            <Image
              src={thumbnailPreview}
              alt="Preview"
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded"
            />
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-sm">Klik untuk memilih gambar</p>
              <p className="text-xs text-gray-400">Format: jpg, png</p>
            </div>
          )}
        </div>
        <input
          id="thumbnail-input"
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
        {errors.thumbnail && (
          <p className="mt-1 text-sm text-red-500">{errors.thumbnail.message?.toString()}</p>
        )}
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Title</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Category Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Category</label>
        <select
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
      </div>

      {/* Content Textarea */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-black mb-1">Content</label>
        <textarea
          rows={10}
          placeholder="Tulis konten artikel..."
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
          {...register("content")}
        ></textarea>
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default CreateArticle;
