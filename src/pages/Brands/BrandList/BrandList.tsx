import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import "./BrandList.css";
import { getAllBrandApi, updateBrandStatusApi } from "../../../services/Brands/brand.service";
import { BrandTypes } from "../../../services/Brands/brand.types";

const CategoryList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState<BrandTypes[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandTypes | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const calledOnce = useRef(false);

  // ✅ Load from API
  const loadBrand = async () => {
    try {
      const response = await getAllBrandApi();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mapped: BrandTypes[] = data.map((c: any) => ({
          brand_id: c.brand_id,
          brand_name: c.brand_name,
          description: c.description,
          brand_logo: c.brand_logo,
          status: c.status.toLowerCase() === "active" ? "active" : "inactive",
        }));
        setBrand(mapped);
      } else {
        console.error("Invalid response:", data);
        setBrand([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setBrand([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadBrand();
  }, []);

  // ✅ Toggle Status
  const toggleStatus = async (brand_id: number, currentStatus: "active" | "inactive") => {
    const newStatus: "active" | "inactive" = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateBrandStatusApi(brand_id, { status: newStatus });
      const updated = brand.map((cat) =>
        cat.brand_id === brand_id ? { ...cat, status: newStatus } : cat
      );
      setBrand(updated);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  // // ✅ Delete
  // const handleDelete = async (id: number) => {
  //   try {
  //     await deleteBrandApi(id);
  //     setBrand((prev) => prev.filter((cat) => cat.brand_id !== id));
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //   }
  // };

  // ✅ Filtered Data
  const filtered = Array.isArray(brand)
    ? brand.filter((c) =>
      c.brand_name?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: "brand_id", label: "#" },
    { key: "brand_name", label: "Brand Name" },
    { key: "description", label: "Description" },
    {
      key: "brand_logo",
      label: "Image",
      render: (value: string) =>
        value ? (
          <img
            src={value}
            alt="Brand"
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
          onClick={() => toggleStatus(row.brand_id, row.status)}
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
        <button className="add-btn" onClick={() => navigate("/add/brand")}>
          + Add Brand
        </button>
      </div>

      {/* ✅ Table with paginated data */}
      <CommonTable
        columns={columns}
        data={paginatedData}
        tableClassName="compact-table"
        actions={(row) => (
          <>
            <button className="action-btn view" onClick={() => setSelectedBrand(row)}> View</button>
            <button className="action-btn edit" onClick={() => navigate(`/edit/brand/${row.brand_id}`)}> Edit </button>
            {/* <button className="action-btn delete" onClick={() => handleDelete(row.brand_id)}> Delete</button> */}
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
      {selectedBrand && (
        <div className="modal-overlay" onClick={() => setSelectedBrand(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Brand Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedBrand.brand_id}</td>
                </tr>
                <tr>
                  <td><strong>Brand Name</strong></td>
                  <td>{selectedBrand.brand_name}</td>
                </tr>
                <tr>
                  <td><strong>Description</strong></td>
                  <td>{selectedBrand.description}</td>
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
                      onClick={() =>
                        setSelectedBrand({
                          ...selectedBrand,
                          status: selectedBrand.status === "active" ? "inactive" : "active",
                        })
                      }
                    >
                      {selectedBrand.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Image</strong></td>
                  <td>
                    {selectedBrand.brand_logo ? (
                      <img
                        src={selectedBrand.brand_logo}
                        alt={selectedBrand.brand_name}
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setSelectedBrand(null)} style={{ marginTop: "15px" }} > Close </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;