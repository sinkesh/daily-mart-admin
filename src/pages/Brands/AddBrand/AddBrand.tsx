import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBrand.css";
import { createBrandApi } from "../../../services/Brands/brand.service";

const AddBrand: React.FC = () => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setBrandLogo(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brandName.trim() || !description.trim() || !brandLogo) return;

    try {
      await createBrandApi(brandName, description, brandLogo); // ✅ API call
      navigate("/brand/list"); // redirect after success
    } catch (error) {
      console.error("Error creating:", error);
      alert("Failed to create. Please try again.");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add Brand</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="image-upload-box">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <span>Click to upload image</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddBrand;
