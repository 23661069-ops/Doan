import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Xóa session Supabase
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Supabase logout error:", error);
          toast.error("Đăng xuất thất bại. Thử lại.");
        } else {
          // Xóa user trong localStorage
          localStorage.removeItem("user");
          toast.success("Đăng xuất thành công!");
          navigate("/login");
        }
      } catch (err) {
        console.error("Unexpected error during logout:", err);
        toast.error("Có lỗi xảy ra. Thử lại.");
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Đang đăng xuất...</h2>
      </div>
    </div>
  );
}
