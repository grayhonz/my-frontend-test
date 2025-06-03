// src/app/admin/categories/components/DeleteCategoryModal.tsx

import React from "react";

interface DeleteCategoryModalProps {
  category: {
    id: string;
    name: string;
    createdAt: string;
  };
  onClose: () => void;
}

const DeleteCategoryModal = ({ category, onClose }: DeleteCategoryModalProps) => {
  const handleDelete = () => {
    // Handle deletion logic here (e.g., API call)
    console.log("Deleting category:", category.id);
    onClose(); // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold text-black mb-4">Delete Category</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete the category &quot;{category.name}&quot;? This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;