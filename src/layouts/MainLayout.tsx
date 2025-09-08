import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  pageTitle?: string; // ✅ Optional page title
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, collapsed, setCollapsed, pageTitle }) => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`layout-main ${collapsed ? "collapsed" : ""}`}>
        {/* Navbar */}
        <Navbar />

        {/* Page Heading / Dashboard Text */}
        {pageTitle && (
          <div className="page-heading">
            <h1>{pageTitle}</h1>
          </div>
        )}

        {/* Content Area */}
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
