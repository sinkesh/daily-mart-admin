import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaBell } from "@react-icons/all-files/fa/FaBell";
import { useNavigate } from "react-router-dom";
import './Navbar.css'
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaFileAlt } from "@react-icons/all-files/fa/FaFileAlt";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { FaBoxOpen } from "@react-icons/all-files/fa/FaBoxOpen";


const Navbar: React.FC<any> = ({ setIsAuthenticated, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: "New user registered", time: "09:15 AM", icon: <FaEnvelope />, type: "info" },
    { id: 2, text: "Order #1023 has been received", time: "09:45 AM", icon: <FaFileAlt />, type: "success" },
    { id: 3, text: "New user added to the team", time: "10:00 AM", icon: <FaUsers />, type: "user" },
    { id: 4, text: "Stock for item #204 is critically low", time: "10:15 AM", icon: <FaBoxOpen />, type: "critical" },
    { id: 5, text: "Order #1025 is delayed", time: "10:25 AM", icon: <FaShoppingCart />, type: "alert" },
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className={`navbar ${collapsed ? "collapsed-navbar" : ""}`}>
      {/* Left: Sidebar toggle */}
      <div className="navbar-left" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
        <a href="/" className="home-link">
          Home
        </a>
      </div>

      {/* Center: Search bar */}
      <div className="navbar-center">
        <input
          type="text"
          className="navbar-search"
          placeholder="Search..."
        />
      </div>

      {/* Right: Notifications + Logout */}
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
              <div className="notification-header">Notifications</div>
              {notifications.length > 0 ? (
                <>
                  {notifications.map((n) => (
                    <div key={n.id} className="notification-item">
                      <div className={`notification-content ${n.type}`}>
                        <span className="notification-icon">{n.icon}</span>
                        <span className="notification-text">{n.text}</span>
                        <span className="notification-time">{n.time}</span>
                      </div>
                    </div>
                  ))}
                  <div className="notification-footer">
                    <a href="#!" className="see-all">See All Notifications</a>
                  </div>
                </>
              ) : (
                <div className="notification-item">No new notifications</div>
              )}
            </div>
          )}
        </div>

        {/* Welcome Text */}
        <span className="welcome-text" style={{ marginRight: "20px" }}>
          Welcome to Admin
        </span>

        {/* Logout */}
        <a href="#!" className="logout" onClick={() => setShowPopup(true)}>
          <FaSignOutAlt />
          Logout
        </a>
      </div>

      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box animate-popup">
            <h3 className="popup-title">Logout Confirmation</h3>
            <p className="popup-message">Are you sure you want to logout?</p>

            <div className="popup-actions">
              <button className="popup-btn confirm" onClick={handleLogout}>
                Yes
              </button>
              <button className="popup-btn cancel" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
