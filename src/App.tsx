import "./styles.css";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import LogoutPage from "./LogoutPage";
// @ts-ignore
import ProtectedRoute from "./ProtectedRoute";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
// @ts-ignore
import EditProduct from "./EditProduct";

// Trang menu người dùng
// @ts-ignore
import BoSuuTap from "./BoSuuTap";
// @ts-ignore
import BoSuuTapDetail from "./BoSuuTapDetail";
// @ts-ignore
import MuaSam from "./MuaSam";
// @ts-ignore
import KhuyenMai from "./KhuyenMai";
// @ts-ignore
import NhuongQuyen from "./NhuongQuyen";
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
          {/* Trang chính */}
          <Route index element={<ListProducts_SP />} />
          {/* Trang chi tiết sản phẩm */}
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          {/* Trang admin edit sản phẩm */}
          <Route path="/admin/edit/:id" element={<EditProduct />} />
          {/* Trang auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          {/* Trang admin quản lý sản phẩm */}
          <Route
            path="admin/products"
            element={
              <ProtectedRoute>
                <ListProducts_SP_Admin />
              </ProtectedRoute>
            }
          />
          {/* Các trang menu người dùng */}
          <Route path="bosuutap" element={<BoSuuTap />} />
          <Route path="bosuutap/:id" element={<BoSuuTapDetail />} />{" "}
          {/* Chi tiết bộ sưu tập */}
          <Route path="muasam" element={<MuaSam />} />
          <Route path="khuyenmai" element={<KhuyenMai />} />
          <Route path="nhuongquyen" element={<NhuongQuyen />} />
          <Route path="tintuc" element={<TinTuc />} />
          <Route path="lienhe" element={<LienHe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
