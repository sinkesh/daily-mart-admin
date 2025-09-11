import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";

const ProductList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // For modal
  const navigate = useNavigate();

  // Load products from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
  }, []);

  const toggleStatus = (id: number) => {
    const updated = products.map((cat) =>
      cat.id === id
        ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
        : cat
    );
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const deleteCategory = (id: number) => {
    const updated = products.filter((cat) => cat.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

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
    {
      key: "status",
      label: "Status",
      render: (value: string, row: any) => (
        <span
          className="status-badge"
          style={{
            backgroundColor: value === "active" ? "#d4f5d4" : "#f5d4d4",
            color: value === "active" ? "green" : "red",
          }}
          onClick={() => toggleStatus(row.id)}
        >
          {value === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
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
            <button
              className="action-btn edit"
              onClick={() => setSelectedProduct(row)}
            >
              View
            </button>
            <button
              className="action-btn edit"
              onClick={() => navigate(`/edit/category/${row.id}`)}
            >
              Edit
            </button>
            <button
              className="action-btn delete"
              onClick={() => deleteCategory(row.id)}
            >
              Delete
            </button>
          </>
        )}
      />

       {/* Modal */}
       {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3>Category Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedProduct.id}</td>
                </tr>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>{selectedProduct.name}</td>
                </tr>
                <tr>
                  <td><strong>Category</strong></td>
                  <td>{selectedProduct.category}</td>
                </tr>
                <tr>
                  <td><strong>Price</strong></td>
                  <td>{selectedProduct.price}</td>
                </tr>
                <tr>
                  <td><strong>Stock</strong></td>
                  <td>{selectedProduct.stock}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: selectedProduct.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color: selectedProduct.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Toggle status in modal and main table
                        const updatedStatus = selectedProduct.status === "active" ? "inactive" : "active";
                        const updatedProduct = products.map((cat) =>
                          cat.id === selectedProduct.id ? { ...cat, status: updatedStatus } : cat
                        );
                        setProducts(updatedProduct);
                        localStorage.setItem("products", JSON.stringify(updatedProduct));
                        setSelectedProduct({ ...selectedProduct, status: updatedStatus });
                      }}
                    >
                      {selectedProduct.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="add-btn"
              onClick={() => setSelectedProduct(null)}
              style={{ marginTop: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
