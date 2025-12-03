import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import supabase from "../supabaseClient";
import "../assets/css/admin.css";

export default function Dashboard_Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  // Lấy số lượng sản phẩm và đơn hàng
  const fetchStats = async () => {
    const { data: productsData } = await supabase.from("product1").select("*");
    const { data: ordersData } = await supabase.from("orders").select("*");

    setStats({
      products: productsData?.length || 0,
      orders: ordersData?.length || 0,
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-panel">
      <div className="admin-main">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebar-header">
            <h3>Admin Panel</h3>
            <button
              className="btn gray toggle-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "➡️" : "⬅️"}
            </button>
          </div>

          <div className="sidebar-stats">
            <p>📦 Sản phẩm: {stats.products}</p>
            <p>🛒 Đơn hàng: {stats.orders}</p>
          </div>

          <ul className="sidebar-menu">
            <li>
              <Link to="/admin/products">📦 Quản lý sản phẩm</Link>
            </li>
            <li>
              <Link to="/admin/orders">🛒 Quản lý đơn hàng</Link>
            </li>
          </ul>
        </aside>

        {/* Content chính */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
