import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../../components/Table/Table";
import "./CategoryList.css";

import { getCategories, deleteCategoryApi } from "../../../../services/Category/category.service";
import { Category } from "../../../../services/Category/category.types";

const CategoryList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  // ✅ Load categories from API (Safe)
  const loadCategories = async () => {
    try {
      const response = await getCategories();
      const data = response.data || response; // backend response data

      if (Array.isArray(data)) {
        const mapped: Category[] = data.map((c: any) => ({
          id: c.category_id,
          name: c.category_name,
          image: c.category_image,
          status: c.status.toLowerCase() === "active" ? "active" : "inactive",
        }));

        setCategories(mapped);
      } else {
        console.error("Invalid categories response:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };


  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ Toggle Status (Local Only)
  const toggleStatus = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
          : cat
      )
    );
  };

  // ✅ Delete row without calling API twice
  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategoryApi(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };


  // ✅ Filtered Data
  const filtered = Array.isArray(categories)
    ? categories.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Category Name" },
    {
      key: "image",
      label: "Image",
      render: (value: string) =>
        value ? (
          <img
            src={value}
            alt="Category"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string, row: Category) => (
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
        <button className="add-btn" onClick={() => navigate("/add/category")}>
          + Add Category
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={filtered}
        actions={(row) => (
          <>
            <button className="action-btn edit" onClick={() => setSelectedCategory(row)}>
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
              onClick={() => handleDeleteCategory(row.id)}
            >
              Delete
            </button>
          </>
        )}
      />

      {/* ✅ Modal */}
      {selectedCategory && (
        <div className="modal-overlay" onClick={() => setSelectedCategory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                        backgroundColor:
                          selectedCategory.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color:
                          selectedCategory.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setSelectedCategory({
                          ...selectedCategory,
                          status:
                            selectedCategory.status === "active"
                              ? "inactive"
                              : "active",
                        })
                      }
                    >
                      {selectedCategory.status === "active"
                        ? "Active"
                        : "Inactive"}
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
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
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
