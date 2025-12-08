import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaUserShield,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import supabase from "../supabaseClient";
import "../assets/css/admin.css";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard_Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    admins: 0,
  });
  const [userBarData, setUserBarData] = useState(null);
  const [userPieData, setUserPieData] = useState(null);
  const [orderBarData, setOrderBarData] = useState(null);
  const [orderPieData, setOrderPieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  // Fetch stats from Supabase
  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data: productsData } = await supabase
        .from("product1")
        .select("*");
      const { data: ordersData } = await supabase.from("orders").select("*");
      const { data: usersData } = await supabase.from("users").select("*");

      const userCount = usersData.filter((u) => u.role === "user").length;
      const adminCount = usersData.filter((u) => u.role === "admin").length;

      setStats({
        products: productsData?.length || 0,
        orders: ordersData?.length || 0,
        users: userCount,
        admins: adminCount,
      });

      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser?.role === "admin") setAdminName(localUser.username);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // User registration per month
      const userMonthCounts = Array(12).fill(0);
      usersData.forEach((u) => {
        const d = new Date(u.created_at);
        userMonthCounts[d.getMonth()] += 1;
      });
      setUserBarData({
        labels: months,
        datasets: [
          {
            label: "User đăng ký",
            data: userMonthCounts,
            backgroundColor: "#0088FE",
          },
        ],
      });

      // User email confirmed
      const confirmed = usersData.filter((u) => u.email_confirmed_at).length;
      const notConfirmed = usersData.length - confirmed;
      setUserPieData({
        labels: ["Đã xác nhận", "Chưa xác nhận"],
        datasets: [
          {
            data: [confirmed, notConfirmed],
            backgroundColor: ["#00C49F", "#FF8042"],
          },
        ],
      });

      // Orders per month
      const orderMonthCounts = Array(12).fill(0);
      ordersData.forEach((o) => {
        const d = new Date(o.created_at);
        orderMonthCounts[d.getMonth()] += 1;
      });
      setOrderBarData({
        labels: months,
        datasets: [
          {
            label: "Đơn hàng",
            data: orderMonthCounts,
            backgroundColor: "#FFBB28",
          },
        ],
      });

      // Orders by status
      const pending = ordersData.filter((o) => o.status === "pending").length;
      const completed = ordersData.filter(
        (o) => o.status === "completed"
      ).length;
      const cancelled = ordersData.filter(
        (o) => o.status === "cancelled"
      ).length;
      setOrderPieData({
        labels: ["Chờ xử lý", "Hoàn tất", "Đã hủy"],
        datasets: [
          {
            data: [pending, completed, cancelled],
            backgroundColor: ["#0088FE", "#00C49F", "#FF8042"],
          },
        ],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <FaUserShield size={28} />
            {!collapsed && <span>Admin Panel</span>}
          </div>
          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </button>
        </div>

        {!collapsed && !loading && (
          <div className="sidebar-stats">
            <div className="stat-card products">
              <FaBoxOpen size={24} />
              <div>
                <p>Sản phẩm</p>
                <h3>{stats.products}</h3>
              </div>
            </div>
            <div className="stat-card orders">
              <FaShoppingCart size={24} />
              <div>
                <p>Đơn hàng</p>
                <h3>{stats.orders}</h3>
              </div>
            </div>
            <div className="stat-card users">
              <FaUsers size={24} />
              <div>
                <p>Users</p>
                <h3>{stats.users}</h3>
              </div>
            </div>
            <div className="stat-card admins">
              <FaUserShield size={24} />
              <div>
                <p>Admins</p>
                <h3>{stats.admins}</h3>
              </div>
            </div>
          </div>
        )}

        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/products">
              <FaBoxOpen /> {!collapsed && <span>Quản lý sản phẩm</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <FaShoppingCart /> {!collapsed && <span>Quản lý đơn hàng</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <FaUserShield /> {!collapsed && <span>Quản lý Users</span>}
            </Link>
          </li>
          {!collapsed && (
            <li onClick={handleLogout}>
              <FaSignOutAlt /> <span>Đăng xuất</span>
            </li>
          )}
        </ul>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        {!loading && (
          <div className="admin-welcome">
            <h2>Xin chào, {adminName || "Admin"}</h2>
          </div>
        )}

        {!loading ? (
          <>
            <section className="chart-section">
              <h4>Sản phẩm: Tổng số lượng</h4>
              <Bar
                data={{
                  labels: ["Sản phẩm"],
                  datasets: [
                    {
                      label: "Số lượng sản phẩm",
                      data: [stats.products],
                      backgroundColor: "#8884d8",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                }}
              />
            </section>

            <section className="chart-section">
              <h4>User: Đăng ký theo tháng</h4>
              {userBarData && (
                <Bar
                  data={userBarData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: true } },
                  }}
                />
              )}
            </section>

            <section className="chart-section">
              <h4>User: Email xác nhận / chưa xác nhận</h4>
              {userPieData && (
                <Pie
                  data={userPieData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "bottom" } },
                  }}
                />
              )}
            </section>

            <section className="chart-section">
              <h4>Orders: Theo tháng</h4>
              {orderBarData && (
                <Bar
                  data={orderBarData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: true } },
                  }}
                />
              )}
            </section>

            <section className="chart-section">
              <h4>Orders: Theo trạng thái</h4>
              {orderPieData && (
                <Pie
                  data={orderPieData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "bottom" } },
                  }}
                />
              )}
            </section>
          </>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}

        <Outlet />
      </main>
    </div>
  );
}
