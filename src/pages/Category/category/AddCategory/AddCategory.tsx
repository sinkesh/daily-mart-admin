import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../../services/Category/category.service";
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaSave } from "@react-icons/all-files/fa/FaSave";

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setcategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCategoryImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!categoryName.trim() || !categoryImage) return;
  
    try {
      await createCategory(categoryName, categoryImage, categoryDescription);
      navigate("/category/list");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category. Please try again.");
    }
  };

  return (
    <div className="category-container">
      <div className="header-bar">
        <button className="collapse-btn !w-auto px-4 gap-2" onClick={() => navigate("/category/list")}>
          <FaChevronLeft /> Back to List
        </button>
      </div>

      <form className="add-category-container !max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="!mb-0">Add New Category</h2>
          <button
            className="btn !py-2"
            type="submit"
            disabled={!categoryName.trim() || !categoryImage}
          >
            <FaSave className="mr-2" /> Save Category
          </button>
        </div>

        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Category Name *</label>
            <input
              type="text"
              placeholder="e.g. Fresh Vegetables"
              className="input-field"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Briefly describe this category"
              className="input-field min-h-[120px]"
              value={categoryDescription}
              onChange={(e) => setcategoryDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category Banner/Image *</label>
            <div className="image-upload-box group h-64">
              {preview ? (
                <div className="relative w-full h-full">
                  <img src={preview} alt="Preview" className="preview-image h-full w-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                    <p className="text-white font-bold">Change Image</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                    <FaUpload className="text-cyan-400 text-xl" />
                  </div>
                  <p className="font-semibold">Click to upload image</p>
                  <p className="text-sm text-slate-500 mt-2">Recommended size: 800x400px</p>
                </div>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex justify-end gap-4">
          <button 
            type="button" 
            className="btn !bg-slate-800 !from-slate-800 !to-slate-900"
            onClick={() => navigate("/category/list")}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn px-8"
            disabled={!categoryName.trim() || !categoryImage}
          >
            Save & Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
