import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddSubCategory.css";

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCategoryImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryImage) {
      return;
    }

    const stored = JSON.parse(localStorage.getItem("categories") || "[]");
    stored.push({
      id: stored.length + 1,
      name: categoryName,
      image: preview,
      status: "active", // 👈 default status save
    });

    localStorage.setItem("categories", JSON.stringify(stored));

    navigate("/category/list"); // redirect after save
  };

  return (
    <div className="add-category-container">
      <h2>Add Sub Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        {/* Image Upload Box */}
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
