import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import "./Navbar.css";

interface NavbarProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsAuthenticated, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className={`navbar ${collapsed ? "collapsed-navbar" : ""}`}>
      <div className="navbar-left">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
      </div>

      {/* Right - Logout + Welcome */}
      <div className="navbar-right">
        <span className="welcome-text" style={{ marginRight: "20px" }}>
          Welcome to Admin
        </span>
        <button className="logout-btn" onClick={() => setShowPopup(true)}>
          <FaSignOutAlt style={{ marginRight: "6px" }} />
          Logout
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Are you sure you want to logout?</p>
            <div className="popup-actions">
              <button className="confirm-btn" onClick={handleLogout}>
                Yes
              </button>
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
