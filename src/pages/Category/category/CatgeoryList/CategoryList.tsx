import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../../components/Table/Table";
import "./CategoryList.css";
import { getCategories, updateCategoryStatusApi } from "../../../../services/Category/category.service";
import { Category } from "../../../../services/Category/category.types";

const CategoryList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // ✅ Current page state
  const itemsPerPage = 10; // ✅ Show 10 rows per page
  const navigate = useNavigate();
  const calledOnce = useRef(false);

  // ✅ Load categories from API
  const loadCategories = async () => {
    try {
      const response = await getCategories();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mapped: Category[] = data.map((c: any) => ({
          id: c.category_id,
          name: c.category_name,
          image: c.category_image,
          status: c.status.toLowerCase() === "active" ? "active" : "inactive",
        }));
        setCategories(mapped);
      } else {
        console.error("Invalid response:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadCategories();
  }, []);

  // ✅ Toggle Status
  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateCategoryStatusApi(id, { status: newStatus });
      const updated = categories.map((cat) =>
        cat.id === id ? { ...cat, status: newStatus } : cat
      );
      setCategories(updated);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  // // ✅ Delete Category
  // const handleDeleteCategory = async (id: number) => {
  //   try {
  //     await deleteCategoryApi(id);
  //     setCategories((prev) => prev.filter((cat) => cat.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //   }
  // };

  // ✅ Filtered Data
  const filtered = Array.isArray(categories)
    ? categories.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

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
              width: "30px",
              height: "30px",
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
      render: (value: string, row: any) => (
        <span
          className="status-badge"
          style={{
            backgroundColor: value === "active" ? "#d4f5d4" : "#f5d4d4",
            color: value === "active" ? "green" : "red",
            cursor: "pointer",
          }}
          onClick={() => toggleStatus(row.id, row.status)}
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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // ✅ reset page on search
          }}
          className="search-bar"
        />
        <button className="add-btn" onClick={() => navigate("/add/category")}>
          Add Category
        </button>
      </div>

      {/* ✅ Table with paginated data */}
      <CommonTable
        columns={columns}
        data={paginatedData}
        tableClassName="compact-table"
        actions={(row) => (
          <>
            <button className="action-btn view" onClick={() => setSelectedCategory(row)}> View</button>
            <button className="action-btn edit" onClick={() => navigate(`/edit/category/${row.id}`)}> Edit </button>
            {/* <button className="action-btn delete" onClick={() => handleDeleteCategory(row.id)}> Delete</button> */}
          </>
        )}
      />

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} > Previous </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}> Next </button>
      </div>

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
                          status: selectedCategory.status === "active" ? "inactive" : "active",
                        })
                      }
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
            <button className="add-btn" onClick={() => setSelectedCategory(null)} style={{ marginTop: "15px" }} > Close </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;