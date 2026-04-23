import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {isMobile && !collapsed && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <div className={`layout-main ${collapsed ? "collapsed" : ""}`}>
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {pageTitle && (
          <div className="page-heading">
            <h1>{pageTitle}</h1>
          </div>
        )}

        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
