import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../../components/Table/Table";
import "./SubCategoryList.css";
import { getSubCategories, deleteSubCategoryApi, updateSubCategoryStatusApi } from "../../../../services/SubCategory/SubCategory.service";
import { SubCategory } from "../../../../services/SubCategory/SubCategory.types";

const SubCategoryList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null); // For modal
  const [currentPage, setCurrentPage] = useState(1); // ✅ Current page state
  const itemsPerPage = 10; // ✅ Show 10 rows per page
  const navigate = useNavigate();
  const calledOnce = useRef(false);

  const loadSubCategories = async () => {
    try {
      const response = await getSubCategories();
      const data = response.data || response; // backend response data

      if (Array.isArray(data)) {
        const mapped: SubCategory[] = data.map((c: any) => ({
          id: c.sub_category_id,
          category_name: c.category_name,
          sub_category_name: c.sub_category_name,
          sub_category_image: c.sub_category_image,
          image: c.sub_category_image,
          status: c.status.toLowerCase() === "active" ? "active" : "inactive",
        }));

        setSubCategories(mapped);
      } else {
        console.error("Invalid categories response:", data);
        setSubCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setSubCategories([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadSubCategories();
  }, []);

  // Toggle status function
  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      await updateSubCategoryStatusApi(id, { status: newStatus });
      const updated = subCategories.map((cat) =>
        cat.id === id ? { ...cat, status: newStatus } : cat
      );
      setSubCategories(updated);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  // Delete row function
  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteSubCategoryApi(id);
      setSubCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Search filter
  const filtered = subCategories.filter((c) =>
    `${c.category_name} ${c.sub_category_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);


  // Columns for table
  const columns = [
    { key: "id", label: "#" },
    { key: "category_name", label: "Category Name" },
    { key: "sub_category_name", label: "Sub Category Name" },
    {
      key: "sub_category_image",
      label: "Image",
      render: (value: string) =>
        value ? (
          <img
            src={value}
            alt="subCategory"
            style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "10px", border: "1px solid #ddd" }}
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
          onClick={() => toggleStatus(row.id, row.status)} // 👈 send current status
        >
          {value === "active" ? "Active" : "Inactive"}
        </span>
      ),
    }

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
        <button className="add-btn" onClick={() => navigate("/add/subcategory")}>
          + Add Sub Category
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={paginatedData}
        tableClassName="compact-table"
        actions={(row) => (
          <>
            <button className="action-btn edit" onClick={() => setSelectedCategory(row)}> View </button>
            <button className="action-btn edit" onClick={() => navigate(`/edit/subcategory/${row.id}`)}> Edit </button>
            <button className="action-btn delete" onClick={() => handleDeleteCategory(row.id)}> Delete </button>
          </>
        )}
      />

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="modal-overlay" onClick={() => setSelectedCategory(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3>Sub Category Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedCategory.id}</td>
                </tr>
                <tr>
                  <td><strong>Category Name</strong></td>
                  <td>{selectedCategory.category_name}</td>
                </tr>
                <tr>
                  <td><strong>Sub Category Name</strong></td>
                  <td>{selectedCategory.sub_category_name}</td>
                </tr>
                <tr>
                  <td><strong>Image</strong></td>
                  <td>
                    {selectedCategory.image ? (
                      <img
                        src={selectedCategory.sub_category_image}
                        alt={selectedCategory.name}
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
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
                        const updatedStatus = selectedCategory.status === "active" ? "inactive" : "active";
                        const updatedSubCategories = subCategories.map((cat) =>
                          cat.id === selectedCategory.id ? { ...cat, status: updatedStatus } : cat
                        );
                        setSubCategories(updatedSubCategories);
                        localStorage.setItem("subCategories", JSON.stringify(updatedSubCategories));
                        setSelectedCategory({ ...selectedCategory, status: updatedStatus });
                      }}
                    >
                      {selectedCategory.status === "active" ? "Active" : "Inactive"}
                    </span>
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

export default SubCategoryList;