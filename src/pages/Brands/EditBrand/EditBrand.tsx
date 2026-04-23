import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getByIdBrandApi, updateBrandApi } from "../../../services/Brands/brand.service";

const EditBrand: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // store actual file
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch category by ID
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        const data = await getByIdBrandApi(parseInt(id));
        setBrandName(data.brand_name);
        setDescription(data.description);
        setPreview(data.brand_logo || null);
      } catch (error) {
        console.error("Error fetching:", error);
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
      formData.append("brand_name", brandName);
      formData.append("description", description);
      if (imageFile) formData.append("brand_logo", imageFile);

      await updateBrandApi(parseInt(id), formData);
      navigate("/brand/list");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="add-category-container">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Brand Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

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

export default EditBrand;
