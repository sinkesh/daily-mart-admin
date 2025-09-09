import React, { useState } from "react";
import CommonTable from "../../components/Table/Table";

const ProductList: React.FC = () => {
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 60000, stock: 12 },
    { id: 2, name: "Shoes", category: "Fashion", price: 3000, stock: 50 },
    { id: 3, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
  ];

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
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
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
