import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";

const ProductList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  // Load products from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price (₹)" },
    { key: "stock", label: "Stock" },
  ];

  return (
    <div className="product-container">
      <div className="header-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button className="add-btn" onClick={() => navigate("/add/products")}>
          + Add Product
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={filtered}
        actions={(row) => (
          <>
            <button className="action-btn edit">Edit</button>
            <button className="action-btn delete">Delete</button>
          </>
        )}
      />
    </div>
  );
};

export default ProductList;
