import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubCategoryById, updateSubCategoryApi } from "../../../../services/SubCategory/SubCategory.service";
import { SubCategory } from "../../../../services/SubCategory/SubCategory.types";
import { getCategories } from "../../../../services/Category/category.service";
import "./EditSubCategory.css";

interface CategoryType {
  category_id: number;
  category_name: string;
}

const EditSubCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryDescription, setSubCategoryDescription] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCatId, setSelectedCatId] = useState("");

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const res = await getCategories();
      setCategoryList(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategory details
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const numericId = Number(id);
        const data: SubCategory = await getSubCategoryById(numericId);

        setCategoryName(data.category_name || "");
        setSubCategoryName(data.sub_category_name || "");
        setSubCategoryDescription(data.sub_category_description || "");
        setStatus(data.status || "active");
        setPreview(data.sub_category_image || null);

        // ✅ Set selectedCatId based on fetched category
        const selectedCat = categoryList.find(cat => cat.category_name === data.category_name);
        if (selectedCat) setSelectedCatId(String(selectedCat.category_id));

      } catch (error) {
        console.error("Failed to fetch subcategory:", error);
        alert("Failed to load subcategory details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, categoryList]);


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
    formData.append("sub_category_description", subCategoryDescription);
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
      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <select
          value={selectedCatId}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCatId(value);
            setCategoryName(
              value
                ? categoryList.find((c) => c.category_id === Number(value))?.category_name || ""
                : ""
            );
          }}
          className="add-category-dropdown"
        >
          <option value="">
            Select Category
          </option>

          {categoryList.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>

        {/* SubCategory Name */}
        <input
          type="text"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          placeholder="Enter SubCategory Name"
        />

        <input
          type="text"
          placeholder="Enter Sub Category Description"
          value={subCategoryDescription}
          onChange={(e) => setSubCategoryDescription(e.target.value)}
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
