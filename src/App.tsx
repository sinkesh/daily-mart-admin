import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserList from "./pages/Users/UserList";
import Roles from "./pages/Roles/RoleList";
import PrivateRoute from "./components/routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import ProductList from "./pages/Products/ProductList/ProductList";
import CategoryList from "./pages/Category/Category/CatgeoryList/CategoryList";
import AddProduct from "./pages/Products/AddProduct/AddProduct";
import AddCategory from "./pages/Category/Category/AddCategory/AddCategory";
import EditCategory from "./pages/Category/Category/EditCategory/EditCategory"
import SubCatgeoryList from "./pages/Category/SubCategory/SubCategoryList/SubCategoryList";
import AddSubCategory from "./pages/Category/SubCategory/AddSubCategory/AddSubCategory";
import EditSubCategory from "./pages/Category/SubCategory/EditSubCategory/EditSubCategory";
import AddStock from "./pages/Stock/AddStock/AddStock";
import EditStock from "./pages/Stock/EditStock/EditStock";
import StockList from "./pages/Stock/StockList/StockList";
import AddBrand from "./pages/Brands/AddBrand/AddBrand";
import EditBrand from "./pages/Brands/EditBrand/EditBrand";
import BrandList from "./pages/Brands//BrandList/BrandList";
import FaqList from "./pages/Faq/FaqList/FaqList";
import AddFaq from "./pages/Faq/AddFaq/AddFaq";
import EditFaq from "./pages/Faq/EditFaq/EditFaq";

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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Dashboard" >
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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Users">
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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Roles">
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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Product">
                <ProductList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/products"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Product">
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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Category">
                <CategoryList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/category"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add category">
                <AddCategory />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/category/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Category" >
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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Sub Category">
                <SubCatgeoryList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/subcategory"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Sub Category">
                <AddSubCategory />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/subcategory/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Sub Category" >
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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Stock">
                <StockList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/stock"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Stock">
                <AddStock />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/stock/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Stock" >
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
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Brand">
                <BrandList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/brand"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Brand">
                <AddBrand />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/brand/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Brand" >
                <EditBrand />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Faq */}
        <Route
          path="/faq/list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Faq">
                <FaqList />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add/faq"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Faq">
                <AddFaq />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/faq/:faq_id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Faq" >
                <EditFaq />
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