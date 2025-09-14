import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBrand.css";

const AddBrand: React.FC = () => {
  const [brandName, setbrandName] = useState("");
  const [brandImage, setbrandImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setbrandImage(file);

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

    if (!brandName.trim() || !brandImage) {
      return;
    }

    const stored = JSON.parse(localStorage.getItem("brand") || "[]");
    stored.push({
      id: stored.length + 1,
      name: brandName,
      image: preview,
      status: "active",
    });

    localStorage.setItem("brand", JSON.stringify(stored));

    navigate("/brand/list"); // redirect after save
  };

  return (
    <div className="add-category-container">
      <h2>Add Brand</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Brand Name"
          value={brandName}
          onChange={(e) => setbrandName(e.target.value)}
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

        <button type="submit">Save Brand</button>
      </form>
    </div>
  );
};

export default AddBrand;
