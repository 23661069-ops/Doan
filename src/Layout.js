import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import "./assets/css/main.css";
import "./assets/css/login.css";
import HomePage from "./HomePage";

export default function Layout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="main-wrapper">
      {/* Top header */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>📞 0972359666</span>
          <span>Hệ thống showroom</span>
        </div>
        <div className="top-bar-right">
          <Link to="/orders" className="top-link">
            Tra cứu đơn hàng
          </Link>
          <Link to="/cart" className="top-link cart-link">
            🛒 Giỏ hàng
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="main-header">
        <div className="header-content">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
            <span className="logo-text">Trang Web Của Bạn</span>
          </div>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
            />
          </div>
          <div className="auth-area">
            {user ? (
              <div className="user-info">
                <span className="username">👤 {user.username}</span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-login">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">TRANG CHỦ</Link>
          </li>
          <li className="nav-item">
            <Link to="/bosuutap">BỘ SƯU TẬP</Link>
          </li>
          <li className="nav-item">
            <Link to="/muasam">MUA SẮM</Link>
          </li>
          <li className="nav-item">
            <Link to="/khuyenmai">KHUYẾN MÃI</Link>
          </li>
          <li className="nav-item">
            <Link to="/nhuongquyen">NHƯỢNG QUYỀN</Link>
          </li>
          <li className="nav-item">
            <Link to="/tintuc">TIN TỨC</Link>
          </li>
          <li className="nav-item">
            <Link to="/lienhe">LIÊN HỆ</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 - Thiết kế giao diện mô phỏng Orchid
      </footer>
    </div>
  );
}
