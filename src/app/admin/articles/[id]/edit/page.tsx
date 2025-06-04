"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Sidebar from "../../../components/sidebar";
import UserMenu from "../../../components/UserMenu";
import useArticleById from "../../hooks/useArticleById";

const schema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  description: z.string().min(10, "Konten minimal 10 karakter"),
  thumbnail: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const EditArticlePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { article, loading, error } = useArticleById(id);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]); // untuk select categories lebih dinamis

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Reset form ketika artikel berhasil dimuat
  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        category: article.categories[0] || "",
        description: article.description,
        thumbnail: article.imageUrl,
      });
      setThumbnailPreview(article.imageUrl);
    }
  }, [article, reset]);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    alert("Artikel berhasil diperbarui!");
    router.back();
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
  //untuk select dinamis
  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        category: article.categories[0] || "",
        description: article.description,
        thumbnail: article.imageUrl,
      });
      setThumbnailPreview(article.imageUrl);
      
      // Set daftar kategori yang tersedia
      setAvailableCategories(article.categories);
    }
  }, [article, reset]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !article) return <div className="p-4 text-red-500">Artikel tidak ditemukan</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="w-full flex justify-between items-center px-6 py-4 bg-[#E9F0FF] border-b border-[#D9E2F9]">
          <h1 className="text-xl font-semibold text-black">Edit Article</h1>
          <UserMenu user={{ name: "James Dean", initial: "J" }} onLogout={() => console.log("Logout")} />
        </div>
        <div className="flex-1 bg-gray-50 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Thumbnail</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
                onClick={() => document.getElementById("thumbnail-input")?.click()}
              >
                {thumbnailPreview ? (
                  <Image
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    width={700}
                    height={400}
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="text-center text-gray-400">No image selected</div>
                )}
                <p className="mt-2 text-sm text-center text-gray-500">
                  Klik untuk memilih file <br />
                  <span className="text-xs text-gray-400">Format: jpg atau png</span>
                </p>
              </div>
              <input
                id="thumbnail-input"
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                {...register("thumbnail")}
                onChange={handleFileChange}
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Title</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                {...register("title")}
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Category</label>
              <select
                className={`w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
                {...register("category")}
              >
                <option value="">Pilih kategori</option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Content</label>
              <textarea
                rows={10}
                className={`w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                {...register("description")}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticlePage;
