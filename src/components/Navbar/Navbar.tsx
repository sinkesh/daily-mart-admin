import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      {/* Home button redirect karega */}
      <div className="logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        Home
      </div>

      {/* Logout button */}
      <button className="logout-btn">Logout</button>
    </div>
  );
};

export default Navbar;
