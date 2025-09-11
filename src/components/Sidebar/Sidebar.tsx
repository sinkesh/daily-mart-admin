import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaCog } from "@react-icons/all-files/fa/FaCog";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaList } from "@react-icons/all-files/fa/FaList";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaShieldAlt } from "@react-icons/all-files/fa/FaShieldAlt";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuData = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/Dashboard"
  },
  {
    name: "Users",
    icon: <FaUser />,
    submenu: [
      { name: "User List", path: "/users/list", icon: <FaList /> },
      { name: "Roles", path: "/users/roles", icon: <FaShieldAlt /> }
    ]
  },
  {
    name: "Poducts",
    icon: <FaUser />,
    submenu: [
      { name: "Product List", path: "/products/list", icon: <FaList /> },
    ]
  },
  {
    name: "Category",
    icon: <FaUser />,
    submenu: [
      { name: "Category List", path: "/category/list", icon: <FaList /> },
      { name: "Sub Category List", path: "/subcategory/list", icon: <FaShieldAlt /> }
    ]
  },
  {
    name: "Settings",
    icon: <FaCog />,
    submenu: [
      { name: "Profile", path: "/settings/profile", icon: <FaList /> },
      { name: "Change Password", path: "/settings/changepassword", icon: <FaPlus /> },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo">{collapsed ? "D..." : "Daily Mart"}</span>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
      </div>

      {menuData.map((menu) => (
        <div className="menu-item" key={menu.name}>
          {menu.submenu ? (
            <>
              {/* <div className="menu-parent" onClick={() => toggleMenu(menu.name)}>
                <span className="icon">{menu.icon}</span>
                {!collapsed && (
                  <>
                    {menu.name}
                    <span className="arrow">{openMenu === menu.name ? "" : "▼"}</span>
                  </>
                )}
              </div> */}
              <div className="menu-parent" onClick={() => toggleMenu(menu.name)}>
  <span className="icon">{menu.icon}</span>
  {!collapsed && (
    <>
      {menu.name}
      <span className="arrow">
        {openMenu === menu.name ? (
          <i className="fas fa-angle-down"></i> 
        ) : (
          <i className="fas fa-angle-left"></i> 
        )}
      </span>
    </>
  )}
</div>

              {openMenu === menu.name && !collapsed && (
                <div className="submenu">
                  {menu.submenu.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      className={({ isActive }) => isActive ? "active-submenu" : ""}
                    >
                      <span className="icon">{sub.icon}</span>
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NavLink to={menu.path!} className={({ isActive }) => isActive ? "active" : ""}>
              <span className="icon">{menu.icon}</span>
              {!collapsed && menu.name}
            </NavLink>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
