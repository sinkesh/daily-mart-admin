import React, { useState } from "react";
import "./RoleList.css";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string;
}

const initialRoles: Role[] = [
  { id: 1, name: "Admin", description: "Full access to the system", permissions: "All" },
  { id: 2, name: "Editor", description: "Can edit content", permissions: "Edit, View" },
  { id: 3, name: "Viewer", description: "Can view content only", permissions: "View" },
  { id: 4, name: "Manager", description: "Can manage teams", permissions: "View, Edit, Assign" },
];

const Roles: React.FC = () => {
  const [roles] = useState<Role[]>(initialRoles);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter roles based on search
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.permissions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="roles-container">
      <div className="roles-header">
        <h1>Roles List</h1>
        <input
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="role-search"
        />
      </div>
      <div className="roles-table-wrapper">
        <table className="roles-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>{role.permissions}</td>
                <td className="actions">
                  <button className="action-btn edit"><FaEdit /></button>
                  <button className="action-btn delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
