import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSubCategory } from "../../../../services/SubCategory/SubCategory.service";
import "./AddSubCategory.css";

const AddSubCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categorySubImage, setSubCategoryImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSubCategoryImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim() || !subCategoryName.trim() || !categorySubImage) {
      alert("Please fill all fields!");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("sub_category_name", subCategoryName);
    formData.append("sub_category_image", categorySubImage);

    try {
      await createSubCategory(formData); // Call API
      navigate("/subcategory/list");
    } catch (error) {
      console.error("❌ Error creating subcategory:", error);
      alert("Failed to create subcategory");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Create SubCategory</h2>
      <form onSubmit={handleSubmit}>
        {/* Category Name Field */}
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        {/* SubCategory Name Field */}
        <input
          type="text"
          placeholder="Enter SubCategory Name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />

        {/* Image Upload Field */}
        <div className="image-upload-box">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="preview-image" />
          ) : (
            <span>Click to upload Image</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddSubCategory;
