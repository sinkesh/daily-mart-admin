import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStock } from "../../../services/Stock/Stock.service";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaSave } from "@react-icons/all-files/fa/FaSave";
import { FaBoxes } from "@react-icons/all-files/fa/FaBoxes";

const AddStock: React.FC = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [status] = useState<"active" | "inactive">("active");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !brandName || !categoryName) {
      alert("Please fill all required fields!");
      return;
    }

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

  const renderInput = (label: string, value: string, setter: (val: string) => void, type: string = "text", placeholder: string = "", required: boolean = false) => (
    <div className="form-group">
      <label className="form-label">{label} {required && "*"}</label>
      <input
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="input-field"
        required={required}
      />
    </div>
  );

  return (
    <div className="stock-container">
      <div className="header-bar">
        <button className="collapse-btn !w-auto px-4 gap-2" onClick={() => navigate("/inventory/list")}>
          <FaChevronLeft /> Back to Inventory
        </button>
      </div>

      <form className="add-category-container !max-w-4xl" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="!mb-0 flex items-center gap-3">
            <FaBoxes className="text-cyan-400" />
            Add New Stock
          </h2>
          <button
            className="btn !py-2"
            type="submit"
            disabled={!productName || !brandName || !categoryName}
          >
            <FaSave className="mr-2" /> Save Stock
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Product Info</h3>
            {renderInput("Product Name", productName, setProductName, "text", "Search or enter product...", true)}
            {renderInput("Brand Name", brandName, setBrandName, "text", "e.g. DailyMart Fresh", true)}
            {renderInput("Category", categoryName, setCategoryName, "text", "e.g. Vegetables", true)}
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Inventory Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {renderInput("Quantity", stockQuantity, (val) => /^\d*$/.test(val) && setStockQuantity(val), "text", "0")}
              {renderInput("Reorder Level", reorderLevel, (val) => /^\d*$/.test(val) && setReorderLevel(val), "text", "10")}
            </div>
            {renderInput("Unit Price (₹)", unitPrice, (val) => /^\d*\.?\d*$/.test(val) && setUnitPrice(val), "text", "0.00")}
            {renderInput("Warehouse Location", warehouseLocation, setWarehouseLocation, "text", "e.g. Rack A-12")}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex justify-end gap-4">
          <button 
            type="button" 
            className="btn !bg-slate-800 !from-slate-800 !to-slate-900"
            onClick={() => navigate("/inventory/list")}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn px-8"
            disabled={!productName || !brandName || !categoryName}
          >
            Add to Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStock;
