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
          {/* Trang người dùng */}
          <Route index element={<ListProducts_SP />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />

          {/* Admin Panel */}
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <Dashboard_Admin />
              </ProtectedRoute>
            }
          >
            <Route path="products" element={<ListProducts_SP_Admin />} />
            <Route path="edit/:id" element={<EditProduct_Admin />} />
          </Route>

          {/* Trang auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Các trang menu người dùng */}
          <Route path="orders" element={<OrdersPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="bosuutap" element={<BoSuuTap />} />
          <Route path="bosuutap/:id" element={<BoSuuTapDetail />} />
          <Route path="muasam" element={<MuaSam />} />
          <Route path="khuyenmai" element={<KhuyenMai />} />
          <Route path="tintuc" element={<TinTuc />} />
          <Route path="lienhe" element={<LienHe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
