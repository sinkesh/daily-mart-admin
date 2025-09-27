import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LogoImg from "../../assets/icon3.jpeg";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaCog } from "@react-icons/all-files/fa/FaCog";
import { FaList } from "@react-icons/all-files/fa/FaList";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaTags } from "@react-icons/all-files/fa/FaTags";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaBoxOpen } from "@react-icons/all-files/fa/FaBoxOpen";
import { FaThLarge } from "@react-icons/all-files/fa/FaThLarge";
import { FaLayerGroup } from "@react-icons/all-files/fa/FaLayerGroup";
import { FaShieldAlt } from "@react-icons/all-files/fa/FaShieldAlt";
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FaTruck } from "@react-icons/all-files/fa/FaTruck";
import { FaWarehouse } from "@react-icons/all-files/fa/FaWarehouse";
import { FaClipboardList } from "@react-icons/all-files/fa/FaClipboardList";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaExclamationTriangle } from "@react-icons/all-files/fa/FaExclamationTriangle";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { FaBox } from "@react-icons/all-files/fa/FaBox";
import { FaClipboard } from "@react-icons/all-files/fa/FaClipboard";
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaTruckMoving } from "@react-icons/all-files/fa/FaTruckMoving";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { FaMoneyBillAlt } from "@react-icons/all-files/fa/FaMoneyBillAlt";
import { FaUndo } from "@react-icons/all-files/fa/FaUndo";
import { FaChartLine } from "@react-icons/all-files/fa/FaChartLine";
import { FaMoneyBillWave } from "@react-icons/all-files/fa/FaMoneyBillWave";
import { FaChartPie } from "@react-icons/all-files/fa/FaChartPie";
import { FaBell } from "@react-icons/all-files/fa/FaBell";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuData = [
  { name: "Dashboard", icon: <FaHome />, path: "/Dashboard" },
  {
    name: "Users",
    icon: <FaUsers />,
    submenu: [
      { name: "Users", path: "/users/list", icon: <FaList /> },
      { name: "Roles", path: "/users/roles", icon: <FaShieldAlt /> },
    ],
  },
  {
    name: "Products",
    icon: <FaBoxOpen />,
    submenu: [
      { name: "Product", path: "/product/list", icon: <FaList /> },
      { name: "Brand", path: "/brand/list", icon: <FaTags /> },
    ],
  },
  {
    name: "Category",
    icon: <FaLayerGroup />,
    submenu: [
      { name: "Category", path: "/category/list", icon: <FaThLarge /> },
      { name: "Sub Category", path: "/subcategory/list", icon: <FaThLarge /> },
    ],
  },
  {
    name: "Inventory",
    icon: <FaWarehouse />,
    submenu: [
      { name: "Stock", path: "/inventory/list", icon: <FaClipboardList /> },
      { name: "Stock Adjustment", path: "/inventory/adjust", icon: <FaEdit /> },
      { name: "Low Stock Alerts", path: "/inventory/low-stock", icon: <FaExclamationTriangle /> },
      { name: "Expiry Tracking", path: "/inventory/expiry", icon: <FaCalendarAlt /> },
    ],
  },
  {
    name: "Purchases",
    icon: <FaTruck />,
    submenu: [
      { name: "Purchase Orders", path: "/purchase/orders", icon: <FaShoppingCart /> },
      { name: "Receive Stock", path: "/purchase/receive", icon: <FaBox /> },
      { name: "Vendor Stock Tracking", path: "/purchase/vendor-stock", icon: <FaUsers /> },
    ],
  },
  {
    name: "Orders",
    icon: <FaClipboard />,
    submenu: [
      { name: "All Orders", path: "/orders/all", icon: <FaList /> },
      { name: "Pending Orders", path: "/orders/pending", icon: <FaClock /> },
      { name: "Processing Orders", path: "/orders/processing", icon: <FaTruckMoving /> },
      { name: "Completed Orders", path: "/orders/completed", icon: <FaCheck /> },
      { name: "Cancelled Orders", path: "/orders/cancelled", icon: <FaTimes /> },
      { name: "Returned Orders", path: "/orders/cancelled", icon: <FaUndo /> },
      { name: "Refund Requests", path: "/orders/refunds", icon: <FaMoneyBillAlt /> },
    ]
  },
  {
    name: "Reports",
    icon: <FaChartLine />,
    submenu: [
      { name: "Sales Report", path: "/reports/sales", icon: <FaChartLine /> },
      { name: "Inventory Report", path: "/reports/inventory", icon: <FaBox /> },
      { name: "Category Wise Sales", path: "/reports/category-sales", icon: <FaTags /> },
      { name: "Profit Report", path: "/reports/profit-loss", icon: <FaMoneyBillWave /> },
      { name: "Loss Report", path: "/reports/profit-loss", icon: <FaChartPie /> },
    ]
  },
  { name: "Faq", path: "/faq/list", icon: <FaQuestionCircle /> },
  { name: "Review", path: "/review/list", icon: <FaStar /> },
  { name: "Banner", path: "/banner/list", icon: <FaImage /> },
  {
    name: "Notification",
    icon: <FaBell />,
    submenu: [
      { name: "Single Notification", path: "/notification/singlenotification/list", icon: <FaEnvelope /> },
      { name: "Bulk Notification", path: "/notification/bulknotification/list", icon: <FaUsers /> },
    ],
  },
  {
    name: "Settings",
    icon: <FaCog />,
    submenu: [
      { name: "Profile", path: "/settings/profile", icon: <FaUser /> },
      { name: "Change Password", path: "/setting/changepassword", icon: <FaPlus /> },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleDirectLinkClick = () => {
    // Direct NavLink clicked, close any open submenu
    setOpenMenu(null);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!collapsed ? (
          <>
            <img src={LogoImg} alt="Logo" className="sidebar-logo-img" />
            <span className="sidebar-logo-text">Daily Mart</span>
          </>
        ) : (
          <span className="sidebar-logo-text sidebar-collapsed-text">DM</span>
        )}
      </div>

      {menuData.map((menu) => {
        const isMenuOpen = openMenu === menu.name;
        const isActiveParent =
          menu.submenu?.some((sub) => location.pathname.startsWith(sub.path)) ||
          location.pathname === menu.path;

        return (
          <div
            className={`menu-group ${isMenuOpen || isActiveParent ? "menu-active-group" : ""}`}
            key={menu.name}
          >
            {/* Menu with submenu */}
            {menu.submenu ? (
              <>
                <div
                  className={`menu-parent ${isMenuOpen ? "menu-parent-open" : ""}`}
                  onClick={() => toggleMenu(menu.name)}
                >
                  <span className="icon">{menu.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="menu-text">{menu.name}</span>
                      <span className="arrow">
                        {isMenuOpen ? (
                          <i className="fas fa-angle-down"></i>
                        ) : (
                          <i className="fas fa-angle-left"></i>
                        )}
                      </span>
                    </>
                  )}
                </div>

                {isMenuOpen && !collapsed && (
                  <div className="submenu submenu-open">
                    {menu.submenu.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className={({ isActive }) =>
                          isActive ? "active-submenu" : ""
                        }
                      >
                        <span className="icon">{sub.icon}</span>
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Menu without submenu
              <NavLink
                to={menu.path!}
                onClick={handleDirectLinkClick} // Close other submenus
                className={({ isActive }) =>
                  `menu-parent ${isActive ? "menu-parent-open" : ""}`
                }
              >
                <span className="icon">{menu.icon}</span>
                {!collapsed && <span className="menu-text">{menu.name}</span>}
                {!collapsed && <span className="arrow-placeholder" />}
              </NavLink>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
