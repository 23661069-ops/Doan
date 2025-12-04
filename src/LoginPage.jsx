import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Đăng nhập bằng Supabase (password gốc)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data?.user) {
        // 2️⃣ Kiểm tra email đã xác nhận chưa
        if (!data.user.email_confirmed_at) {
          toast.info("Vui lòng xác nhận email trước khi đăng nhập!");
          return;
        }

        // 3️⃣ Lấy thêm password_hash từ bảng users (để minh họa đồ án)
        const { data: userData, error: fetchError } = await supabase
          .from("users")
          .select("password_hash, role")
          .eq("id", data.user.id)
          .single();

        if (fetchError) {
          console.warn("Không lấy được hash từ bảng users:", fetchError.message);
        }

        const userInfo = {
          email: data.user.email,
          id: data.user.id,
          role: userData?.role || data.user.user_metadata?.role || "user",
          passwordHash: userData?.password_hash || null,
        };

        // 4️⃣ Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify(userInfo));

        toast.success("Đăng nhập thành công!");

        // 5️⃣ Redirect theo role
        if (userInfo.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Không thể đăng nhập, thử lại sau.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Có lỗi xảy ra, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p>
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}
