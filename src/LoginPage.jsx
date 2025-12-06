import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "./assets/images/Logo.png"; // ✔ Logo giống trang register

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Đăng nhập Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data?.user) {
        // 2️⃣ Kiểm tra email xác thực
        if (!data.user.email_confirmed_at) {
          toast.info("Vui lòng xác nhận email trước khi đăng nhập!");
          return;
        }

        // 3️⃣ Lấy thông tin user từ bảng users
        const { data: userData, error: fetchError } = await supabase
          .from("users")
          .select("username, role, password_hash")
          .eq("auth_id", data.user.id) // dùng auth_id để liên kết với auth.users.id
          .single();

        if (fetchError) {
          console.warn("Lỗi khi lấy user:", fetchError.message);
        }

        // 4️⃣ Lưu thông tin vào localStorage
        const userInfo = {
          id: data.user.id,
          email: data.user.email,
          username: userData?.username || "Người dùng",
          role: userData?.role || data.user.user_metadata?.role || "user",
          passwordHash: userData?.password_hash || null,
        };

        localStorage.setItem("user", JSON.stringify(userInfo));

        toast.success("Đăng nhập thành công!");

        // 5️⃣ Điều hướng theo role
        if (userInfo.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Không thể đăng nhập, thử lại sau.");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra, thử lại sau.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={logo} alt="logo" className="login-logo" />

        <h2 className="login-title">Đăng nhập</h2>
        <p className="login-subtitle">Chào mừng quay trở lại!</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="register-link">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </div>
      </div>
    </div>
  );
}
