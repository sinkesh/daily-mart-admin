import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategory.css";
import { createCategory } from "../../../../services/Category/category.service";

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
    <div className="add-category-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Enter Category Description"
          value={categoryDescription}
          onChange={(e) => setcategoryDescription(e.target.value)}
        />

        <div className="image-upload-box">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <span>Click to upload image</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Save Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
