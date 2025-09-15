import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCategory.css";
import { getCategoryById, updateCategoryApi } from "../../../../services/Category/category.service";

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // store actual file
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);

  // Fetch category by ID
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        const data = await getCategoryById(parseInt(id));
        setCategoryName(data.name);
        setPreview(data.image || null); 
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file); // save the actual file
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
  
    try {
      const formData = new FormData();
      formData.append("category_name", categoryName);
      formData.append("status", status.toUpperCase());
      if (imageFile) formData.append("category_image", imageFile);
  
      await updateCategoryApi(parseInt(id), formData);
      navigate("/category/list");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="add-category-container">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />

        <div className="image-upload-box">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <span>Click to upload image</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
