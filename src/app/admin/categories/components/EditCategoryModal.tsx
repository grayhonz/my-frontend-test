// src/app/admin/categories/components/EditCategoryModal.tsx

import React, { useState } from "react";

interface EditCategoryModalProps {
  category: {
    id: string;
    name: string;
    createdAt: string;
  };
  onClose: () => void;
}

const EditCategoryModal = ({ category, onClose }: EditCategoryModalProps) => {
  const [editedName, setEditedName] = useState(category.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Editing category:", editedName);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold text-black mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="editCategoryName" className="block text-gray-700 text-sm font-bold mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="editCategoryName"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter category name"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;