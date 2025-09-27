import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBanner.css";
import { getBannerById, updateBannerApi } from "../../../services/Banner/Banner.service";

const EditCategory: React.FC = () => {
  const { banner_id } = useParams<{ banner_id: string }>();
  const navigate = useNavigate();
  const [bannerName, setBannerName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // store actual file
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);

  // Fetch category by ID
  useEffect(() => {
    const fetchCategory = async () => {
      if (!banner_id) return;
      try {
        const data = await getBannerById(parseInt(banner_id));
        setBannerName(data.banner_name);
        setPreview(data.banner_image || null);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [banner_id]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!banner_id) return;

    try {
      const formData = new FormData();
      formData.append("banner_name", bannerName);
      formData.append("status", status.toUpperCase());
      if (imageFile) formData.append("banner_image", imageFile);

      await updateBannerApi(parseInt(banner_id), formData);
      navigate("/banner/list");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="add-category-container">
      <h2>Edit Banner</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bannerName}
          onChange={(e) => setBannerName(e.target.value)}
          placeholder="Banner Name"
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

export default EditCategory;
