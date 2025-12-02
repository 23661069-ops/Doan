import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./assets/images/Logo.png";
import "./assets/css/login.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Lưu user vào localStorage tạm (thay bằng API khi backend)
    const newUser = { username, password };
    localStorage.setItem("user_data", JSON.stringify(newUser));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={Logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Đăng ký tài khoản</h2>
        <p className="login-subtitle">Tạo tài khoản mới để mua sắm</p>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit">Đăng ký</button>
        </form>

        <p className="register-link">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
}
