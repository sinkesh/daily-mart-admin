import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStock } from "../../../services/Stock/Stock.service";

const AddStock: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Form State
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [status] = useState<"active" | "inactive">("active");

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!productName || !brandName || !categoryName) {
      alert("Please fill all required fields!");
      return;
    }

    // ✅ Prepare JSON Payload
    const payload = {
      product_name: productName,
      brand_name: brandName,
      category_name: categoryName,
      stock_quantity: Number(stockQuantity),
      reorder_level: Number(reorderLevel),
      unit_price: Number(unitPrice),
      warehouse_location: warehouseLocation,
      status,
    };

    try {
      await createStock(payload);
      navigate("/inventory/list");
    } catch (error) {
      console.error("❌ Error creating stock:", error);
      alert("Failed to create stock");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add Stock</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        {/* Brand Name */}
        <input
          type="text"
          placeholder="Enter Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          required
        />

        {/* Category Name */}
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />

        {/* Stock Quantity - Text but only numbers allowed */}
        <input
          type="text"
          placeholder="Enter Stock Quantity"
          value={stockQuantity}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setStockQuantity(value); // allow only digits
          }}
        />

        {/* Reorder Level - Text but only numbers allowed */}
        <input
          type="text"
          placeholder="Enter Reorder Level"
          value={reorderLevel}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setReorderLevel(value); // allow only digits
          }}
        />

        {/* Unit Price - Text but allow decimal */}
        <input
          type="text"
          placeholder="Enter Unit Price"
          value={unitPrice}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) setUnitPrice(value); // allow digits + optional decimal
          }}
        />

        {/* Warehouse Location */}
        <input
          type="text"
          placeholder="Enter Warehouse Location"
          value={warehouseLocation}
          onChange={(e) => setWarehouseLocation(e.target.value)}
        />

        {/* Submit Button */}
        <button type="submit">Save Stock</button>
      </form>
    </div>
  );

};

export default AddStock;
