import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import "./assets/css/login.css";
import logo from "./assets/images/Logo.png";

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim()) return alert("Vui lòng nhập username!");
    if (!email.trim()) return alert("Vui lòng nhập email hợp lệ!");
    if (password !== confirm) return alert("Mật khẩu xác nhận không khớp!");
    if (password.length < 6) return alert("Mật khẩu phải ít nhất 6 ký tự!");

    setLoading(true);

    const passwordHash = await sha256(password);

    // Tạo user trên Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { role, username } },
    });

    if (error) {
      alert("Lỗi: " + error.message);
      setLoading(false);
      return;
    }

    const userId = data.user.id;

    // Lưu vào bảng users
    const { error: insertError } = await supabase.from("users").insert([
      {
        auth_id: userId,
        username: username.trim(),
        email: email.trim(),
        role,
        password_hash: passwordHash,
      },
    ]);

    if (insertError) {
      alert("Lỗi khi lưu vào bảng users: " + insertError.message);
    } else {
      alert("Đăng ký thành công!");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={logo} alt="logo" className="login-logo" />

        <h2 className="login-title">Tạo tài khoản</h2>
        <p className="login-subtitle">Điền thông tin để tiếp tục</p>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Nhập username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu..."
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Quyền người dùng</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <div className="register-link">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
}
