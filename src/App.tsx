import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/routes/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserList from "./pages/Users/AllUsers/UserList";
import ActiveUsersList from "./pages/Users/ActiveUsers/ActiveUsersList";
import QueryList from "./pages/Users/Query/QueryList";
import Roles from "./pages/Roles/RoleList/RoleList";
import ProductList from "./pages/Products/ProductList/ProductList";
import AddProduct from "./pages/Products/AddProduct/AddProduct";
import EditProduct from "./pages/Products/EditProduct/EditProduct";
import CategoryList from "./pages/Category/category/CatgeoryList/CategoryList";
import AddCategory from "./pages/Category/category/AddCategory/AddCategory";
import EditCategory from "./pages/Category/category/EditCategory/EditCategory"
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
import ReviewList from "./pages/Review/ReviewList";
import ChangePassword from "./pages/Settings/ChangePassword/ChangePassword";
import BannerList from "./pages/Banner/BannerList/BannerList";
import AddBanner from "./pages/Banner/AddBanner/AddBanner";
import EditBanner from "./pages/Banner/EditBanner/EditBanner";
import RoleList from "./pages/Roles/RoleList/RoleList";
import AddRole from "./pages/Roles/AddRole/AddRole";
import EditRole from "./pages/Roles/EditRole/EditRole";
import SingleNotificationList from "./pages/Notifications/SingleNotification/SingleNotificationList/SingleNotificationList";
import SendSingleNotification from "./pages/Notifications/SingleNotification/SendSingleNotification/SendSingleNotification";
import BulkNotificationList from "./pages/Notifications/BulkNotification/BulkNotificationList/BulkNotificationList";
import SendBulkNotification from "./pages/Notifications/BulkNotification/SendBulkNotification/SendBulkNotification";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // ✅ Check auth on load
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  // ✅ Check environment variables
  useEffect(() => {
    console.log("✅ Admin Panel Running on PORT:", process.env.PORT);
    console.log("✅ Backend API URL:", process.env.REACT_APP_API_URL);
  }, []);

  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />) : (
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
            path="/allusers/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Users">
                  <UserList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          {/* Active Users List */}
          <Route
            path="/activeusers/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Active Users">
                  <ActiveUsersList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          {/* Query List */}
          <Route
            path="/query/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Query">
                  <QueryList />
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
            path="/product/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Product">
                  <ProductList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/add/product"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Product">
                  <AddProduct />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/product/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Product">
                  <EditProduct />
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
            path="/inventory/list"
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
            path="/edit/stock/:stock_id"
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

          <Route
            path="/review/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Review">
                  <ReviewList />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Banner */}
          <Route
            path="/banner/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Banner">
                  <BannerList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/add/banner"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Banner">
                  <AddBanner />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/banner/:banner_id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Banner" >
                  <EditBanner />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Role */}
          <Route
            path="/role/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Role">
                  <RoleList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/add/role"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Add Role">
                  <AddRole />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/role/:role_id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Edit Role" >
                  <EditRole />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/notification/singlenotification/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Single Notification" >
                  <SingleNotificationList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/notification/singlenotification"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Single Notification" >
                  <SendSingleNotification />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/notification/bulknotification/list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="All Bulk Notification" >
                  <BulkNotificationList />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/notification/bulknotification"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Bulk Notification" >
                  <SendBulkNotification />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/setting/changepassword"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} setIsAuthenticated={setIsAuthenticated} pageTitle="Change Password">
                  <ChangePassword />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        {/* ✅ Yeh div Routes ke bahar hona chahiye */}
        <div style={{ textAlign: "center", padding: "20px", marginTop: "auto" }}>
          <h2>Admin Panel</h2>
          <p>Backend API URL: {process.env.REACT_APP_API_URL}</p>
        </div>
      </div>
    </Router>
  );
};

export default App;