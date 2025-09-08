import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, collapsed, setCollapsed }) => {
  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`layout-main ${collapsed ? "collapsed" : ""}`}>
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
