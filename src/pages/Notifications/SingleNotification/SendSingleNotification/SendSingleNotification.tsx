import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBanner } from "../../../../services/Banner/Banner.service";

const AddBanner: React.FC = () => {
  const [bannerName, setBannerName] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setBannerImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bannerName.trim() || !bannerImage) return;

    try {
      await createBanner(bannerName, bannerImage);
      navigate("/banner/list");
    } catch (error) {
      console.error("Error creating:", error);
      alert("Failed to create. Please try again.");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Email"
          value={bannerName}
          onChange={(e) => setBannerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Title"
          value={bannerName}
          onChange={(e) => setBannerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={bannerName}
          onChange={(e) => setBannerName(e.target.value)}
        />

        <div className="image-upload-box">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <span>Click to upload image</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AddBanner;
