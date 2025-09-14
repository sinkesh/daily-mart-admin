import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import "./BrandList.css"; // Make sure modal styles are included

const BrandList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [brand, setbrand] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<any>(null); // For modal
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("brand") || "[]");
    setbrand(stored);
  }, []);

  // Toggle status function
  const toggleStatus = (id: number) => {
    const updated = brand.map((cat) =>
      cat.id === id
        ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
        : cat
    );
    setbrand(updated);
    localStorage.setItem("brand", JSON.stringify(updated));
  };

  // Delete row function
  const deleteBrand = (id: number) => {
    const updated = brand.filter((cat) => cat.id !== id);
    setbrand(updated);
    localStorage.setItem("brand", JSON.stringify(updated));
  };

  // Search filter
  const filtered = brand.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Columns for table
 // Columns for table
const columns = [
  { key: "id", label: "#" },
  { key: "name", label: "Brand Name" },
  {
    key: "image",
    label: "Image",
    render: (value: string) =>
      value ? (
        <img
          src={value}
          alt="Brand"
          style={{ width: "50px", height: "50px", objectFit: "contain",  borderRadius: "10px", border: "1px solid #ddd"  }}
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
              onClick={() => setSelectedBrand(row)}
            >
              View
            </button>
            <button
              className="action-btn edit"
              onClick={() => navigate(`/edit/brand/${row.id}`)}
            >
              Edit
            </button>
            <button
              className="action-btn delete"
              onClick={() => deleteBrand(row.id)}
            >
              Delete
            </button>
          </>
        )}
      />

      {/* Modal */}
      {selectedBrand && (
        <div className="modal-overlay" onClick={() => setSelectedBrand(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3>Brand Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedBrand.id}</td>
                </tr>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>{selectedBrand.name}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: selectedBrand.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color: selectedBrand.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Toggle status in modal and main table
                        const updatedStatus = selectedBrand.status === "active" ? "inactive" : "active";
                        const updatedBrand = brand.map((cat) =>
                          cat.id === selectedBrand.id ? { ...cat, status: updatedStatus } : cat
                        );
                        setbrand(updatedBrand);
                        localStorage.setItem("brand", JSON.stringify(updatedBrand));
                        setSelectedBrand({ ...selectedBrand, status: updatedStatus });
                      }}
                    >
                      {selectedBrand.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Image</strong></td>
                  <td>
                    {selectedBrand.image ? (
                      <img
                        src={selectedBrand.image}
                        alt={selectedBrand.name}
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
              onClick={() => setSelectedBrand(null)}
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

export default BrandList;
