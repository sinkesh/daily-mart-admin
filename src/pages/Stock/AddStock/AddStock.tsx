import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStock.css";

const AddStock: React.FC = () => {
  const [stockName, setStockName] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stockImage, setStockImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ Image Change Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setStockImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // ✅ Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Validation ---
    if (!stockName.trim() || !sku.trim() || quantity === "" || price === "" || !stockImage) {
      alert("All fields are required!");
      return;
    }

    if (!/^\d+$/.test(quantity)) {
      alert("Quantity must be a valid number!");
      return;
    }

    if (!/^\d*\.?\d+$/.test(price)) {
      alert("Price must be a valid number!");
      return;
    }

    // --- Save in localStorage ---
    const storedStock = JSON.parse(localStorage.getItem("stock") || "[]");

    const newStock = {
      id: storedStock.length + 1,
      name: stockName,
      sku,
      quantity: Number(quantity),
      price: Number(price),
      image: preview,
      status: "active",
    };

    storedStock.push(newStock);
    localStorage.setItem("stock", JSON.stringify(storedStock));

    // --- Redirect to List ---
    navigate("/stock/list");
  };

  return (
    <div className="add-category-container">
      <h2>Add Stock</h2>

      <form onSubmit={handleSubmit}>
        {/* Stock Name */}
        <input
          type="text"
          placeholder="Enter Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />

        {/* SKU */}
        <input
          type="text"
          placeholder="Enter SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />

        {/* Quantity */}
        <input
          type="text"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setQuantity(value); // ✅ only digits allowed
          }}
        />

        {/* Price */}
        <input
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) setPrice(value); // ✅ allow digits + decimal
          }}
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

        <button type="submit">Save Stock</button>
      </form>
    </div>
  );
};

export default AddStock;
