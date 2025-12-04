import "./styles.css";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import RegisterPage from "./RegisterPage";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import LogoutPage from "./LogoutPage";
// @ts-ignore
import ProtectedRoute from "./ProtectedRoute";
// @ts-ignore
import Dashboard_Admin from "./admin/Dashboard_Admin";
// @ts-ignore
import ListProducts_SP_Admin from "./admin/ListProducts_SP_Admin";
// @ts-ignore
import EditProduct_Admin from "./admin/EditProduct_Admin";
// @ts-ignore
import AdminUsersPage from "./admin/AdminUsersPage";
// @ts-ignore
import AdminOrdersPage from "./admin/AdminOrdersPage";

// Trang menu người dùng
// @ts-ignore
import OrdersPage from "./OrdersPage";
// @ts-ignore
import CartPage from "./CartPage";
// @ts-ignore
import BoSuuTap from "./BoSuuTap";
// @ts-ignore
import BoSuuTapDetail from "./BoSuuTapDetail";
// @ts-ignore
import MuaSam from "./MuaSam";
// @ts-ignore
import KhuyenMai from "./KhuyenMai";
// @ts-ignore
import TinTuc from "./TinTuc";
// @ts-ignore
import LienHe from "./LienHe";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Trang người dùng, chỉ cần user đăng nhập */}
          <Route
            index
            element={
              <ProtectedRoute adminOnly={false}>
                <ListProducts_SP />
              </ProtectedRoute>
            }
          />
          <Route
            path="sanpham/:id"
            element={
              <ProtectedRoute adminOnly={false}>
                <Chitietsanpham />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute adminOnly={false}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute adminOnly={false}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="bosuutap"
            element={
              <ProtectedRoute adminOnly={false}>
                <BoSuuTap />
              </ProtectedRoute>
            }
          />
          <Route
            path="bosuutap/:id"
            element={
              <ProtectedRoute adminOnly={false}>
                <BoSuuTapDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="muasam"
            element={
              <ProtectedRoute adminOnly={false}>
                <MuaSam />
              </ProtectedRoute>
            }
          />
          <Route
            path="khuyenmai"
            element={
              <ProtectedRoute adminOnly={false}>
                <KhuyenMai />
              </ProtectedRoute>
            }
          />
          <Route
            path="tintuc"
            element={
              <ProtectedRoute adminOnly={false}>
                <TinTuc />
              </ProtectedRoute>
            }
          />
          <Route
            path="lienhe"
            element={
              <ProtectedRoute adminOnly={false}>
                <LienHe />
              </ProtectedRoute>
            }
          />

          {/* Admin Panel: chỉ admin mới được truy cập */}
          <Route
            path="admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard_Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/products"
            element={
              <ProtectedRoute adminOnly={true}>
                <ListProducts_SP_Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/edit/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditProduct_Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/users"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/orders"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />
          {/* Trang auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
