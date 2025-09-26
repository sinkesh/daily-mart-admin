import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaBell } from "@react-icons/all-files/fa/FaBell";
import { useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar: React.FC<any> = ({ setIsAuthenticated, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: "New user registered" },
    { id: 2, text: "New order received" },
    { id: 3, text: "Low stock alert" },
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      <div className="navbar-right">

        {/* Notification Bell */}
        <div className="notification-wrapper" ref={notificationRef}>
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown right-align">
              {notifications.map((n) => (
                <div key={n.id} className="notification-item">
                  {n.text}
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="notification-item">No new notifications</div>
              )}
            </div>
          )}
        </div>

        <span className="welcome-text" style={{ marginRight: "20px" }}>
          Welcome to Admin
        </span>

        {/* Logout */}
        <a href="#!" className="logout" onClick={() => setShowPopup(true)}>
          <FaSignOutAlt />
          Logout
        </a>


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
