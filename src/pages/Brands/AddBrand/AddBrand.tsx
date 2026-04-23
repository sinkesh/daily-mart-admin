import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBrandApi } from "../../../services/Brands/brand.service";
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaSave } from "@react-icons/all-files/fa/FaSave";
import { FaTag } from "@react-icons/all-files/fa/FaTag";

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
      await createBrandApi(brandName, description, brandLogo);
      navigate("/brand/list");
    } catch (error) {
      console.error("Error creating:", error);
      alert("Failed to create. Please try again.");
    }
  };

  return (
    <div className="brand-container">
      <div className="header-bar">
        <button className="collapse-btn !w-auto px-4 gap-2" onClick={() => navigate("/brand/list")}>
          <FaChevronLeft /> Back to Brands
        </button>
      </div>

      <form className="add-category-container !max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="!mb-0 flex items-center gap-3">
            <FaTag className="text-cyan-400" />
            Add New Brand
          </h2>
          <button
            className="btn !py-2"
            type="submit"
            disabled={!brandName.trim() || !description.trim() || !brandLogo}
          >
            <FaSave className="mr-2" /> Save Brand
          </button>
        </div>

        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Brand Name *</label>
            <input
              type="text"
              placeholder="e.g. DailyMart Premium"
              className="input-field"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              placeholder="Tell us about this brand..."
              className="input-field min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Brand Logo *</label>
            <div className="image-upload-box group h-56">
              {preview ? (
                <div className="relative w-full h-full p-4">
                  <img src={preview} alt="Preview" className="preview-image h-full w-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                    <p className="text-white font-bold">Change Logo</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-3">
                    <FaUpload className="text-cyan-400" />
                  </div>
                  <p className="font-semibold">Upload Brand Logo</p>
                  <p className="text-xs text-slate-500 mt-2">Recommended: Square PNG with transparency</p>
                </div>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex justify-end gap-4">
          <button 
            type="button" 
            className="btn !bg-slate-800 !from-slate-800 !to-slate-900"
            onClick={() => navigate("/brand/list")}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn px-8"
            disabled={!brandName.trim() || !description.trim() || !brandLogo}
          >
            Register Brand
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
