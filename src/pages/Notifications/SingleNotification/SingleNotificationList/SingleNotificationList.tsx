import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../../components/Table/Table";
import "./SingleNotificationList.css";
import { getAllBanner, updateBannerStatusApi } from "../../../../services/Banner/Banner.service";
import { BannerTypes } from "../../../../services/Banner/Banner.types";

const BannerList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [banner, setBanner] = useState<BannerTypes[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<BannerTypes | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // ✅ Current page state
  const itemsPerPage = 10; // ✅ Show 10 rows per page
  const navigate = useNavigate();
  const calledOnce = useRef(false);

  // ✅ Load banner from API
  const loadBanner = async () => {
    try {
      const response = await getAllBanner();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mapped: BannerTypes[] = data.map((c: any) => ({
          banner_id: c.banner_id,
          banner_name: c.banner_name,
          banner_image: c.banner_image,
          status: c.status.toLowerCase() === "active" ? "active" : "inactive",
        }));
        setBanner(mapped);
      } else {
        console.error("Invalid response:", data);
        setBanner([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setBanner([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadBanner();
  }, []);

  // ✅ Toggle Status
  const toggleStatus = async (banner_id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateBannerStatusApi(banner_id, { status: newStatus });
      const updated = banner.map((cat) =>
        cat.banner_id === banner_id ? { ...cat, status: newStatus } : cat
      );
      setBanner(updated);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  // // ✅ Delete Banner
  // const handleDeleteBanner = async (id: number) => {
  //   try {
  //     await deleteBannerApi(id);
  //     setBanner((prev) => prev.filter((cat) => cat.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //   }
  // };

  // ✅ Filtered Data
  const filtered = Array.isArray(banner)
    ? banner.filter((c) =>
      c.banner_name?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: "banner_id", label: "#" },
    { key: "banner_name", label: "Banner Name" },
    {
      key: "banner_image",
      label: "Banner Image",
      render: (value: string) =>
        value ? (
          <img
            src={value}
            alt="Banner"
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
          onClick={() => toggleStatus(row.banner_id, row.status)}
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
            setCurrentPage(1);
          }}
          className="search-bar"
        />
      </div>

      {/* ✅ Table with paginated data */}
      <CommonTable
        columns={columns}
        data={paginatedData}
        tableClassName="compact-table"
        actions={(row) => (
          <>
            <button className="action-btn edit" onClick={() => setSelectedBanner(row)}> View</button>
            <button className="action-btn edit" onClick={() => navigate(`/edit/banner/${row.banner_id}`)}> Edit </button>
            {/* <button className="action-btn delete" onClick={() => handleDeleteBanner(row.id)}> Delete</button> */}
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
      {selectedBanner && (
        <div className="modal-overlay" onClick={() => setSelectedBanner(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Banner Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedBanner.banner_id}</td>
                </tr>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>{selectedBanner.banner_name}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                        selectedBanner.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color:
                        selectedBanner.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setSelectedBanner({
                          ...selectedBanner,
                          status: selectedBanner.status === "active" ? "inactive" : "active",
                        })
                      }
                    >
                      {selectedBanner.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Image</strong></td>
                  <td>
                    {selectedBanner.banner_image ? (
                      <img
                        src={selectedBanner.banner_image}
                        alt={selectedBanner.banner_image}
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setSelectedBanner(null)} style={{ marginTop: "15px" }} > Close </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerList;