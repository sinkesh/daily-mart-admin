import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import "./FaqList.css";
import { getAllFaq, updateFaqStatusApi } from "../../../services/Faq/Faq.service";
import { Faq } from "../../../services/Faq/Faq.types";

const FaqList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [faq, setFaq] = useState<Faq[]>([]);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // ✅ Current page state
  const itemsPerPage = 10; // ✅ Show 10 rows per page
  const navigate = useNavigate();
  const calledOnce = useRef(false);

  // ✅ Load faq from API
  const loadFaq = async () => {
    try {
      const response = await getAllFaq();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mapped: Faq[] = data.map((c: any) => ({
          faq_id: c.faq_id,
          question: c.question,
          answer: c.answer,
          status: c.status.toLowerCase() === "active" ? "active" : "inactive",
        }));
        setFaq(mapped);
      } else {
        console.error("Invalid faq response:", data);
        setFaq([]);
      }
    } catch (error) {
      console.error("Error fetching faq:", error);
      setFaq([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadFaq();
  }, []);

  // ✅ Toggle Status
  const toggleStatus = async (faq_id: number, currentStatus: "active" | "inactive") => {
    const newStatus: "active" | "inactive" = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateFaqStatusApi(faq_id, { status: newStatus });
      const updated = faq.map((cat) =>
        cat.faq_id === faq_id ? { ...cat, status: newStatus } : cat
      );
      setFaq(updated);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  // // ✅ Delete Faq
  // const handleDeleteFaq = async (faq_id: number) => {
  //   try {
  //     await deleteFaqApi(faq_id);
  //     setFaq((prev) => prev.filter((cat) => cat.faq_id !== faq_id));
  //   } catch (error) {
  //     console.error("Error deleting faq:", error);
  //   }
  // };

  // ✅ Filtered Data
  const filtered = Array.isArray(faq)
    ? faq.filter((c) =>
      c.question?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: "faq_id", label: "#" },
    { key: "question", label: "Question" },
    { key: "answer", label: "Answer" },
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
          onClick={() => toggleStatus(row.faq_id, row.status)}
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
        <button className="add-btn" onClick={() => navigate("/add/faq")}>
          Add Faq
        </button>
      </div>

      {/* ✅ Table with paginated data */}
      <CommonTable
        columns={columns}
        data={paginatedData}
        tableClassName="compact-table"
        actions={(row) => (
          <>
            <button className="action-btn edit" onClick={() => setSelectedFaq(row)}> View</button>
            <button className="action-btn edit" onClick={() => navigate(`/edit/faq/${row.faq_id}`)}> Edit </button>
            {/* <button className="action-btn delete" onClick={() => handleDeleteFaq(row.faq_id)}> Delete</button> */}
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
      {selectedFaq && (
        <div className="modal-overlay" onClick={() => setSelectedFaq(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Faq Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedFaq.faq_id}</td>
                </tr>
                <tr>
                  <td><strong>Question</strong></td>
                  <td>{selectedFaq.question}</td>
                </tr>
                <tr>
                  <td><strong>Answer</strong></td>
                  <td>{selectedFaq.answer}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          selectedFaq.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color:
                          selectedFaq.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setSelectedFaq({
                          ...selectedFaq,
                          status: selectedFaq.status === "active" ? "inactive" : "active",
                        })
                      }
                    >
                      {selectedFaq.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setSelectedFaq(null)} style={{ marginTop: "15px" }} > Close </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqList;