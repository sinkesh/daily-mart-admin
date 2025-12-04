import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSubCategory } from "../../../../services/SubCategory/SubCategory.service";
import { getCategories } from "../../../../services/Category/category.service";
import "./AddSubCategory.css";

interface CategoryType {
  category_id: number;
  category_name: string;
}

const AddSubCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryDescription, setSubCategoryDescription] = useState("");
  const [categorySubImage, setSubCategoryImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCatId, setSelectedCatId] = useState("");

  const navigate = useNavigate();

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

  // Image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSubCategoryImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim() || !subCategoryName.trim() || !categorySubImage) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("sub_category_name", subCategoryName);
    formData.append("sub_category_description", subCategoryDescription);
    formData.append("sub_category_image", categorySubImage);

    try {
      await createSubCategory(formData);
      navigate("/subcategory/list");
    } catch (error) {
      console.error("❌ Error creating subcategory:", error);
      alert("Failed to create subcategory");
    }
  };

  return (
    <div className="add-category-container">
      <form onSubmit={handleSubmit}>

        {/* CATEGORY DROPDOWN */}

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



        {/* SUB CATEGORY INPUT */}
        <input
          type="text"
          placeholder="Enter Sub Category Name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          className="placeholder:text-sm"
        />

        <input
          type="text"
          placeholder="Enter Sub Category Description"
          value={subCategoryDescription}
          onChange={(e) => setSubCategoryDescription(e.target.value)}
        />

        {/* IMAGE UPLOAD */}
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
