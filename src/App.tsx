import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserList from "./pages/Users/UserList";
import Roles from "./pages/Roles/RoleList";
import PrivateRoute from "./components/routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import ProductList from "./pages/Products/ProductList";
import CategoryList from "./pages/Category/category/category";
import SubCatgeoryList from "./pages/Category/sub_category/sub_category";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // ✅ Check localStorage on load
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📊 Dashboard Overview">
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Users List */}
        <Route
          path="/users/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="👥 Users List">
                <UserList />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Roles */}
        <Route
          path="/users/roles"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="🔑 Roles Management">
                <Roles />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Product List">
                <ProductList />
              </MainLayout>
            </PrivateRoute>
          }
        />

<Route
          path="/category/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="👥 Category List">
                <CategoryList />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Roles */}
        <Route
          path="/subcategory/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="🔑 Sub Category List">
                <SubCatgeoryList />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
