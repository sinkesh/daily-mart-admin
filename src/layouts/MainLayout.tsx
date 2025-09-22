import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  pageTitle?: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
   className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  collapsed,
  setCollapsed,
  pageTitle,
  setIsAuthenticated,
}) => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className={`layout-main ${collapsed ? "collapsed" : ""}`}>
        {/* ✅ Pass collapsed & setCollapsed to Navbar */}
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Page Heading */}
        {pageTitle && (
          <div className="page-heading">
            <h1>{pageTitle}</h1>
          </div>
        )}

        {/* Content */}
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
