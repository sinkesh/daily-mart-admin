import React, { useEffect, useRef, useState } from "react";
import CommonTable from "../../../components/Table/Table";
import { getAllUser, updateUserStatusApi } from "../../../services/Users/User.service";
import { UserTypes } from "../../../services/Users/User.types";

const UserList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<UserTypes[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const calledOnce = useRef(false);

  // ✅ Load product from API
  const loadUser = async () => {
    try {
      const response = await getAllUser();
      const data = response.data || response;

      if (Array.isArray(data)) {
        const mapped: UserTypes[] = data.map((u: any) => ({
          user_id: u.user_id,
          first_name: u.first_name,
          last_name: u.last_name,
          user_name: u.user_name,
          email: u.email,
          is_email_verified: u.is_email_verified,
          phone_number: u.phone_number,
          is_phone_verified: u.is_phone_verified,
          role: u.role,
          gender: u.gender,
          date_of_birth: u.date_of_birth,
          profile_image: u.profile_image,
          status: u.status.toLowerCase() === "active" ? "active" : "inactive",
        }));

        setUser(mapped);
      } else {
        console.error("Invalid response:", data);
        setUser([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setUser([]);
    }
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    loadUser();
  }, []);

  // ✅ Toggle Status
  const toggleStatus = async (user_id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateUserStatusApi(user_id, { status: newStatus });
      const updated = user.map((cat) =>
        cat.user_id === user_id ? { ...cat, status: newStatus } : cat
      );
      setUser(updated);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  // // ✅ Delete Category
  // const handleDeleteCategory = async (user_id: number) => {
  //   try {
  //     await deleteCategoryApi(user_id);
  //     setUser((prev) => prev.filter((cat) => cat.user_id !== user_id));
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //   }
  // };

  // ✅ Filtered Data
  const filtered = Array.isArray(user)
    ? user.filter((c) =>
      c.first_name?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  // ✅ Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: "user_id", label: "#" },
    {
      key: "full_name",
      label: "Full Name",
      render: (_: string, row: UserTypes) => `${row.first_name || ""} ${row.last_name || ""}`,
    },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone Number" },
    { key: "date_of_birth", label: "DOB" },
    { key: "gender", label: "Gender" },
    {
      key: "profile_image",
      label: "Image",
      render: (value: string) =>
        value ? (
          <img
            src={value}
            alt="User"
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
          onClick={() => toggleStatus(row.user_id, row.status)}
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
            <button className="action-btn view" onClick={() => setSelectedUser(row)}> View</button>
            {/* <button className="action-btn edit" onClick={() => navigate(`/edit/user/${row.user_id}`)}> Edit </button> */}
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
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>User Details</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{selectedUser.user_id}</td>
                </tr>
                <tr>
                  <td><strong>First Name</strong></td>
                  <td>{selectedUser.first_name}</td>
                </tr>
                <tr>
                  <td><strong>Last Name</strong></td>
                  <td>{selectedUser.last_name}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          selectedUser.status === "active" ? "#d4f5d4" : "#f5d4d4",
                        color:
                          selectedUser.status === "active" ? "green" : "red",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setSelectedUser({
                          ...selectedUser,
                          status: selectedUser.status === "active" ? "inactive" : "active",
                        })
                      }
                    >
                      {selectedUser.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Image</strong></td>
                  <td>
                    {selectedUser.profile_image ? (
                      <img
                        src={selectedUser.profile_image}
                        alt={selectedUser.profile_image}
                        className="modal-preview"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="add-btn" onClick={() => setSelectedUser(null)} style={{ marginTop: "15px" }} > Close </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;