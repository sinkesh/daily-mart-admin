import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import "./StockList.css";

const StockList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [stock, setStock] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const navigate = useNavigate();

  // ✅ Load stock from localStorage
  useEffect(() => {
    const storedStock = JSON.parse(localStorage.getItem("stock") || "[]");
    setStock(storedStock);
  }, []);

  // ✅ Toggle status function
  const toggleStatus = (id: number) => {
    const updated = stock.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "active" ? "inactive" : "active" }
        : item
    );
    setStock(updated);
    localStorage.setItem("stock", JSON.stringify(updated));
  };

  // ✅ Delete row function
  const deleteStock = (id: number) => {
    const updated = stock.filter((item) => item.id !== id);
    setStock(updated);
    localStorage.setItem("stock", JSON.stringify(updated));
  };

  // ✅ Search filter
  const filtered = stock.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Stock Name" },
    { key: "sku", label: "SKU" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
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
        <button className="add-btn" onClick={() => navigate("/add/stock")}>
          + Add Stock
        </button>
      </div>

      {/* ✅ Updated Table */}
      <CommonTable
        columns={columns}
        data={filtered}
        actions={(row) => (
          <>
            <button
              className="action-btn edit"
              onClick={() => setSelectedStock(row)}
            >
              View
            </button>
            <button
              className="action-btn edit"
              onClick={() => navigate(`/edit/stock/${row.id}`)}
            >
              Edit
            </button>
            <button
              className="action-btn delete"
              onClick={() => deleteStock(row.id)}
            >
              Delete
            </button>
          </>
        )}
      />

      {/* ✅ Modal */}
      {selectedStock && (
        <div className="modal-overlay" onClick={() => setSelectedStock(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Stock Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedStock.id}</td>
                </tr>
                <tr>
                  <td><strong>Stock Name</strong></td>
                  <td>{selectedStock.name}</td>
                </tr>
                <tr>
                  <td><strong>SKU</strong></td>
                  <td>{selectedStock.sku}</td>
                </tr>
                <tr>
                  <td><strong>Quantity</strong></td>
                  <td>{selectedStock.quantity}</td>
                </tr>
                <tr>
                  <td><strong>Price</strong></td>
                  <td>{selectedStock.price}</td>
                </tr>
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
                      onClick={() => {
                        const updatedStatus =
                          selectedStock.status === "active"
                            ? "inactive"
                            : "active";
                        const updatedStock = stock.map((item) =>
                          item.id === selectedStock.id
                            ? { ...item, status: updatedStatus }
                            : item
                        );
                        setStock(updatedStock);
                        localStorage.setItem("stock", JSON.stringify(updatedStock));
                        setSelectedStock({ ...selectedStock, status: updatedStatus });
                      }}
                    >
                      {selectedStock.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Image</strong></td>
                  <td>
                    {selectedStock.image ? (
                      <img
                        src={selectedStock.image}
                        alt={selectedStock.name}
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
              onClick={() => setSelectedStock(null)}
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

export default StockList;