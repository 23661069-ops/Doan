
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "⚠️ Vui lòng đăng nhập để tiếp tục!" }}
      />
    );
  }
  if (roleRequired === "admin" && user.username !== "admin") {
    alert("❌ Bạn không có quyền truy cập trang quản trị!");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
