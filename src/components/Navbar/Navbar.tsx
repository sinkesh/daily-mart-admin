import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);   // ✅ authentication reset
    setShowPopup(false);
    navigate("/login");          // ✅ redirect to login
  };

  return (
    <div className="navbar">
      {/* Home button */}
      <div
        className="logo"
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      >
        Home
      </div>

      {/* Logout button */}
      <button className="logout-btn" onClick={() => setShowPopup(true)}>
        Logout
      </button>

      {/* Confirmation Popup */}
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
