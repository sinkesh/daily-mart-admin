import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserList from "./pages/Users/UserList";
import Roles from "./pages/Roles/RoleList";
import PrivateRoute from "./components/routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import ProductList from "./pages/Products/ProductList/ProductList";
import CategoryList from "./pages/Category/category/CatgeoryList/CategoryList";
import AddProduct from "./pages/Products/AddProduct/AddProduct";
import AddCategory from "./pages/Category/category/AddCategory/AddCategory";
import EditCategory from "./pages/Category/category/EditCategory/EditCategory";
import SubCatgeoryList from "./pages/Category/sub_category/SubCategoryList/SubCategoryList";
import AddSubCategory from "./pages/Category/sub_category/AddSubCategory/AddSubCategory";
import EditSubCategory from "./pages/Category/sub_category/EditSubCategory/EditSubCategory";
import AddStock from "./pages/Stock/AddStock/AddStock";
import EditStock from "./pages/Stock/EditStock/EditStock";
import StockList from "./pages/Stock/StockList/StockList";
import AddBrand from "./pages/Brands/AddBrand/AddBrand";
import EditBrand from "./pages/Brands/EditBrand/EditBrand";
import BrandList from "./pages/Brands//BrandList/BrandList";

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
        {/* Add Products */}
        <Route
          path="/add/products"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Add Product">
                <AddProduct />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* Category */}
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
        <Route
          path="/add/category"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Add Category">
                <AddCategory />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/category/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Edit Category" >
                <EditCategory />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* Sub Category */}
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
        <Route
          path="/add/subcategory"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Add Sub Category">
                <AddSubCategory />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/subcategory/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Edit Sub Category" >
                <EditSubCategory />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* Stock */}
        <Route
          path="/stock/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="🔑 Stock List">
                <StockList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/stock"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Add Stock">
                <AddStock />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/stock/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Edit Stock" >
                <EditStock />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* Brand */}
        <Route
          path="/brand/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="🔑 Brand List">
                <BrandList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/brand"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Add Brand">
                <AddBrand />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/brand/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="📦 Edit Brand" >
                <EditBrand />
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
