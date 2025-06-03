// src/app/admin/categories/components/CategoryCard.tsx

import React, { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    createdAt: string;
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // State to control modal visibility
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <tr className="border-t">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{category.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{category.createdAt}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button onClick={() => setShowEditModal(true)} className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
          <button onClick={() => setShowDeleteModal(true)} className="text-red-600 hover:text-red-900">Delete</button>
        </td>
      </tr>

      {/* Edit Category Modal */}
      {showEditModal && (
        <EditCategoryModal
          category={category}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && (
        <DeleteCategoryModal
          category={category}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default CategoryCard;