import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import "./StockList.css";
import { getAllStock, updateStockStatusApi, deleteStockApi } from "../../../services/Stock/Stock.service";
import { Stock } from "../../../services/Stock/Stock.types";

const StockList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [stock, setStock] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const calledOnce = useRef(false);

  // ✅ Load Stock API
  const loadStock = async () => {
    try {
      const response = await getAllStock();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mapped: Stock[] = data.map((c: any) => ({
          stock_id: c.stock_id, // ✅ API se jo key aati hai usko local key banaya
          product_name: c.product_name,
          brand_name: c.brand_name,
          category_name: c.category_name,
          stock_quantity: c.stock_quantity,
          reorder_level: c.reorder_level,
          unit_price: c.unit_price,
          status: c.status?.toLowerCase() === "active" ? "active" : "inactive",
          image: c.image || null,
        }));

        setStock(mapped);
      } else {
        console.error("Invalid stock response:", data);
        setStock([]);
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
      setStock([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadStock();
  }, []);

  // ✅ Toggle status
  const toggleStatus = async (stock_id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateStockStatusApi(stock_id, { status: newStatus });
      setStock((prev) =>
        prev.map((s) =>
          s.stock_id === stock_id ? { ...s, status: newStatus } : s
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Delete Stock
  const handleDeleteStock = async (stock_id: number) => {
    try {
      await deleteStockApi(stock_id);
      setStock((prev) => prev.filter((s) => s.stock_id !== stock_id));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  // ✅ Search filter
  const filtered = stock.filter((s) =>
    `${s.product_name} ${s.brand_name} ${s.category_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: "stock_id", label: "#" },
    { key: "product_name", label: "Product Name" },
    { key: "brand_name", label: "Brand" },
    { key: "category_name", label: "Category" },
    { key: "stock_quantity", label: "Quantity" },
    { key: "reorder_level", label: "Reorder Level" },
    { key: "unit_price", label: "Price" },
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
          onClick={() => toggleStatus(row.stock_id, value)}
        >
          {value === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="stock-container">
      <div className="header-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button className="add-btn" onClick={() => navigate("/add/stock")}>
          + Add Stock
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={paginatedData}
        actions={(row) => (
          <>
            <button className="action-btn edit" onClick={() => setSelectedStock(row)}> View </button>
            <button className="action-btn edit" onClick={() => navigate(`/edit/stock/${row.id}`)}> Edit </button>
            <button className="action-btn delete" onClick={() => handleDeleteStock(row.stock_id)}> Delete </button>
          </>
        )}
      />

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}> Previous  </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>  Next </button>
      </div>

      {/* ✅ Modal for stock details */}
      {selectedStock && (
        <div className="modal-overlay" onClick={() => setSelectedStock(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Stock Details</h3>
            <table className="details-table">
              <tbody>
                <tr><td><strong>Product</strong></td><td>{selectedStock.product_name}</td></tr>
                <tr><td><strong>Brand</strong></td><td>{selectedStock.brand_name}</td></tr>
                <tr><td><strong>Category</strong></td><td>{selectedStock.category_name}</td></tr>
                <tr><td><strong>Quantity</strong></td><td>{selectedStock.stock_quantity}</td></tr>
                <tr><td><strong>Reorder Level</strong></td><td>{selectedStock.reorder_level}</td></tr>
                <tr><td><strong>Price</strong></td><td>{selectedStock.unit_price}</td></tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          selectedStock.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color:
                          selectedStock.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        toggleStatus(selectedStock.stock_id, selectedStock.status)
                      }
                    >
                      {selectedStock.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setSelectedStock(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockList;