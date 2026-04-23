import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import { getAllRole, updateRoleStatusApi } from "../../../services/Role/Role.service";
import { RoleTypes } from "../../../services/Role/Role.types";

const RoleList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<RoleTypes[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleTypes | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const calledOnce = useRef(false);

  // ✅ Load role from API
  const loadRole = async () => {
    try {
      const response = await getAllRole();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mapped: RoleTypes[] = data.map((c: any) => ({
          role_id: c.role_id,
          role_name: c.role_name,
          status: c.status.toLowerCase() === "active" ? "active" : "inactive",
        }));
        setRole(mapped);
      } else {
        console.error("Invalid response:", data);
        setRole([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setRole([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadRole();
  }, []);

  // ✅ Toggle Status
  const toggleStatus = async (role_id: number, currentStatus: "active" | "inactive") => {
    const newStatus: "active" | "inactive" = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateRoleStatusApi(role_id, { status: newStatus });
      const updated = role.map((cat) =>
        cat.role_id === role_id ? { ...cat, status: newStatus } : cat
      );
      setRole(updated);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  // // ✅ Delete role
  // const handleDeleteROle = async (role_id: number) => {
  //   try {
  //     await deleteRoleApi(role_id);
  //     setRole((prev) => prev.filter((cat) => cat.role_id !== role_id));
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //   }
  // };

  // ✅ Filtered Data
  const filtered = Array.isArray(role)
    ? role.filter((c) =>
      c.role_name?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  // ✅ Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: "role_id", label: "#" },
    { key: "role_name", label: "Role Name" },
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
          onClick={() => toggleStatus(row.role_id, row.status)}
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
        <button className="add-btn" onClick={() => navigate("/add/role")}>
          Add Role
        </button>
      </div>

      {/* ✅ Table with paginated data */}
      <CommonTable
        columns={columns}
        data={paginatedData}
        tableClassName="compact-table"
        actions={(row) => (
          <>
            <button className="action-btn view" onClick={() => setSelectedRole(row)}> View</button>
            <button className="action-btn edit" onClick={() => navigate(`/edit/role/${row.role_id}`)}> Edit </button>
            {/* <button className="action-btn delete" onClick={() => handleDeleteROle(row.role_id)}> Delete</button> */}
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
      {selectedRole && (
        <div className="modal-overlay" onClick={() => setSelectedRole(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Role Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedRole.role_id}</td>
                </tr>
                <tr>
                  <td><strong>Role Name</strong></td>
                  <td>{selectedRole.role_name}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          selectedRole.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color:
                          selectedRole.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setSelectedRole({
                          ...selectedRole,
                          status: selectedRole.status === "active" ? "inactive" : "active",
                        })
                      }
                    >
                      {selectedRole.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setSelectedRole(null)} style={{ marginTop: "15px" }} > Close </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleList;