import React, { useState } from "react";
import "./UserList.css";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
//  import SearchBar from "../../components/SearchBar/SearchBar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle user status
const toggleStatus = (id: number) => {
  setUsers(prev =>
    prev.map(user => ({
      ...user,
      status: user.id === id ? (user.status === "Active" ? "Inactive" : "Active") : user.status
    }))
  );
};


  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="userlist-container">
      <div className="userlist-header">
        <h1>User List</h1>
        <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="user-search" />
      </div>

      <div className="userlist-table-wrapper">
        <table className="userlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td
                  className={user.status === "Active" ? "status-active" : "status-inactive"}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleStatus(user.id)}
                  title="Click to toggle status"
                >
                  {user.status}
                </td>
                <td className="actions">
                  <button className="action-btn view" onClick={() => setSelectedUser(user)}><FaEye /></button>
                  <button className="action-btn edit"><FaEdit /></button>
                  <button className="action-btn delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-btn" onClick={() => setSelectedUser(null)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;


// import React, { useState } from "react";
// import Table from "../../components/Table/Table";
// import SearchBar from "../../components/SearchBar/SearchBar";
// import Modal from "../../components/Modal/Modal";
// import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
// import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
// import { FaEye } from "@react-icons/all-files/fa/FaEye";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   status: "Active" | "Inactive";
// }

// const initialUsers: User[] = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
//   { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
// ];

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>(initialUsers);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const filteredUsers = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleStatus = (id: number) => {
//     setUsers(
//       users.map((u) =>
//         u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
//       )
//     );
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
//         <h1>User List</h1>
//         <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search users..." />
//       </div>

//       <Table
//         columns={[
//           { key: "id", label: "ID" },
//           { key: "name", label: "Name" },
//           { key: "email", label: "Email" },
//           { key: "role", label: "Role" },
//           { key: "status", label: "Status" },
//         ]}
//         data={filteredUsers}
//         actions={(row: User) => (
//           <>
//             <button onClick={() => setSelectedUser(row)}><FaEye /></button>
//             <button onClick={() => toggleStatus(row.id)}><FaEdit /></button>
//             <button><FaTrash /></button>
//           </>
//         )}
//       />

//       {selectedUser && (
//         <Modal title="User Details" onClose={() => setSelectedUser(null)}>
//           <p>ID: {selectedUser.id}</p>
//           <p>Name: {selectedUser.name}</p>
//           <p>Email: {selectedUser.email}</p>
//           <p>Role: {selectedUser.role}</p>
//           <p>Status: {selectedUser.status}</p>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default UserList;
