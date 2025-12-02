import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import Logo from "./assets/images/Logo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./assets/css/main.css";
import "./assets/css/login.css";

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
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>📞 0398941795</span>
          <span>Hệ thống</span>
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

      {/* Header */}
      <div className="main-header">
        <div className="header-content">
          <div className="logo">
            <img src={Logo} alt="Logo" />
            <span className="logo-text">Thời Trang Nữ</span>
          </div>

          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
            />
          </div>

          {/* Auth Area */}
          <div className="auth-area">
            {user ? (
              <div className="user-info">
                <span className="username">👤 {user.username}</span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-login">
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="btn btn-register"
                  style={{ marginLeft: "10px" }}
                >
                  Đăng ký
                </Link>
              </div>
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
            <Link to="/tintuc">TIN TỨC</Link>
          </li>
          <li className="nav-item">
            <Link to="/lienhe">LIÊN HỆ</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* Cột 1: Liên hệ */}
          <div className="footer-column">
            <h3>Liên Hệ</h3>
            <p>📞 0398941795</p>
            <p>📧 yennhi405205@gmail.com</p>
            <p>🏠 33 Vĩnh Viễn, Phường Vườn Lài, TP HCM</p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="footer-column">
            <h3>Liên Kết</h3>
            <ul>
              <li>
                <Link to="/">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/bosuutap">Bộ Sưu Tập</Link>
              </li>
              <li>
                <Link to="/muasam">Mua Sắm</Link>
              </li>
              <li>
                <Link to="/khuyenmai">Khuyến Mãi</Link>
              </li>
              <li>
                <Link to="/tintuc">Tin Tức</Link>
              </li>
              <li>
                <Link to="/lienhe">Liên Hệ</Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Newsletter + Social */}
          <div className="footer-column">
            <h3>Đăng Ký Nhận Tin</h3>
            <p>Nhập email để nhận khuyến mãi mới nhất!</p>
            <div className="footer-newsletter">
              <input type="email" placeholder="Email của bạn" />
              <button>Gửi</button>
            </div>
            <div className="footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 - Website Thời Trang Nữ. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
