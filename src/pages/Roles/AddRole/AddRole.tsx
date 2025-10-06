import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRole.css";
import { createRole } from "../../../services/Role/Role.service";

const AddRole: React.FC = () => {
  const [role_name, setRoleName] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role_name.trim()) {
      alert("Please fill both role name");
      return;
    }

    try {
      await createRole({ role_name: role_name.trim() });
      navigate("/role/list");
    } catch (error) {
      console.error("Error creating:", error);
      alert("Failed to create. Please try again.");
    }
  };


  return (
    <div className="add-faq-container">
      <h2>Add Role</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Role Name"
          value={role_name}
          onChange={(e) => setRoleName(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddRole;