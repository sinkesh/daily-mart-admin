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
import { FaBoxes } from "@react-icons/all-files/fa/FaBoxes";
import { FaTags } from "@react-icons/all-files/fa/FaTags";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaBoxOpen } from "@react-icons/all-files/fa/FaBoxOpen";
import { FaThLarge } from "@react-icons/all-files/fa/FaThLarge";
import { FaLayerGroup } from "@react-icons/all-files/fa/FaLayerGroup";
import { FaShieldAlt } from "@react-icons/all-files/fa/FaShieldAlt";
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";


interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuData = [
  { name: "Dashboard", icon: <FaHome />, path: "/Dashboard" },
  {
    name: "Users",
    icon: <FaUsers />, // User icon
    submenu: [
      { name: "User List", path: "/users/list", icon: <FaList /> },
      { name: "Roles", path: "/users/roles", icon: <FaShieldAlt /> },
    ],
  },
  {
    name: "Products",
    icon: <FaBoxOpen />, // Product icon
    submenu: [{ name: "Product List", path: "/product/list", icon: <FaList /> }],
  },
  {
    name: "Category",
    icon: <FaLayerGroup />, // Category icon
    submenu: [
      { name: "Category List", path: "/category/list", icon: <FaThLarge /> },
      { name: "Sub Category List", path: "/subcategory/list", icon: <FaThLarge /> },
    ],
  },
  { name: "Stock List", path: "/stock/list", icon: <FaBoxes /> },
  { name: "Brand List", path: "/brand/list", icon: <FaTags /> },
  { name: "Faq List", path: "/faq/list", icon: <FaQuestionCircle /> },
  {
    name: "Settings",
    icon: <FaCog />, // Settings icon
    submenu: [
      { name: "Profile", path: "/settings/profile", icon: <FaUser /> },
      { name: "Change Password", path: "/settings/changepassword", icon: <FaPlus /> },
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
