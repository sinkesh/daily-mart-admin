import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import "./BrandList.css"; // Make sure modal styles are included

const CategoryList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null); // For modal
  const navigate = useNavigate();

  // Load categories from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategories(stored);
  }, []);

  // Toggle status function
  const toggleStatus = (id: number) => {
    const updated = categories.map((cat) =>
      cat.id === id
        ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
        : cat
    );
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  // Delete row function
  const deleteCategory = (id: number) => {
    const updated = categories.filter((cat) => cat.id !== id);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  // Search filter
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Columns for table
  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Category Name" },
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
    <div className="category-container">
      <div className="header-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button className="add-btn" onClick={() => navigate("/add/brand")}>
          + Add Brand
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={filtered}
        actions={(row) => (
          <>
            <button
              className="action-btn edit"
              onClick={() => setSelectedCategory(row)}
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
      {selectedCategory && (
        <div className="modal-overlay" onClick={() => setSelectedCategory(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3>Category Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedCategory.id}</td>
                </tr>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>{selectedCategory.name}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: selectedCategory.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color: selectedCategory.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Toggle status in modal and main table
                        const updatedStatus = selectedCategory.status === "active" ? "inactive" : "active";
                        const updatedCategories = categories.map((cat) =>
                          cat.id === selectedCategory.id ? { ...cat, status: updatedStatus } : cat
                        );
                        setCategories(updatedCategories);
                        localStorage.setItem("categories", JSON.stringify(updatedCategories));
                        setSelectedCategory({ ...selectedCategory, status: updatedStatus });
                      }}
                    >
                      {selectedCategory.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Image</strong></td>
                  <td>
                    {selectedCategory.image ? (
                      <img
                        src={selectedCategory.image}
                        alt={selectedCategory.name}
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="add-btn"
              onClick={() => setSelectedCategory(null)}
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

export default CategoryList;
