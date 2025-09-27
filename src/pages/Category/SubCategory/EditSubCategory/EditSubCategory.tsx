import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubCategoryById, updateSubCategoryApi } from "../../../../services/SubCategory/SubCategory.service";
import { SubCategory } from "../../../../services/SubCategory/SubCategory.types";
import "./EditSubCategory.css";

const EditSubCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch subcategory details
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        // ✅ Convert id to number
        const numericId = Number(id);

        // ✅ Get data from API
        const data: SubCategory = await getSubCategoryById(numericId);

        setCategoryName(data.category_name || "");
        setSubCategoryName(data.sub_category_name || "");
        setStatus(data.status || "active");
        setPreview(data.sub_category_image || null);
      } catch (error) {
        console.error("Failed to fetch subcategory:", error);
        alert("Failed to load subcategory details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim() || !subCategoryName.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("sub_category_name", subCategoryName);
    formData.append("status", status);
    if (imageFile) {
      formData.append("sub_category_image", imageFile);
    }

    try {
      await updateSubCategoryApi(Number(id), formData); // ✅ convert id to number
      navigate("/subcategory/list");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update subcategory.");
    }
  };

  if (loading) return <p>Loading subcategory details...</p>;

  return (
    <div className="add-category-container">
      <h2>Edit SubCategory</h2>
      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter Category Name"
        />

        {/* SubCategory Name */}
        <input
          type="text"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          placeholder="Enter SubCategory Name"
        />

        {/* Image Upload */}
        <div className="image-upload-box">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <span>Click to upload image</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditSubCategory;
