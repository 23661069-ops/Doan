import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaBars,
  FaUserShield,
} from "react-icons/fa";
import supabase from "../supabaseClient";
import "../assets/css/admin.css";
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
import { Bar, Pie } from "react-chartjs-2";

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
  const [userBarData, setUserBarData] = useState({ labels: [], datasets: [] });
  const [userPieData, setUserPieData] = useState({ labels: [], datasets: [] });
  const [orderBarData, setOrderBarData] = useState({
    labels: [],
    datasets: [],
  });
  const [orderPieData, setOrderPieData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data: productsData } = await supabase
        .from("product1")
        .select("*");
      const { data: ordersData } = await supabase.from("orders").select("*");
      const { data: usersData } = await supabase
        .from("users")
        .select("role, created_at, email_confirmed_at");

      const userCount = usersData.filter((u) => u.role === "user").length;
      const adminCount = usersData.filter((u) => u.role === "admin").length;

      setStats({
        products: productsData?.length || 0,
        orders: ordersData?.length || 0,
        users: userCount,
        admins: adminCount,
      });

      // Bar chart user theo tháng
      const monthLabels = [
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
      const userMonthCounts = Array(12).fill(0);
      usersData.forEach((u) => {
        const d = new Date(u.created_at);
        userMonthCounts[d.getMonth()] += 1;
      });
      setUserBarData({
        labels: monthLabels,
        datasets: [
          {
            label: "User đăng ký",
            data: userMonthCounts,
            backgroundColor: "#0088FE",
          },
        ],
      });

      // Pie chart email xác nhận
      const confirmed = usersData.filter((u) => u.email_confirmed_at).length;
      const notConfirmed = usersData.length - confirmed;
      setUserPieData({
        labels: ["Email xác nhận", "Chưa xác nhận"],
        datasets: [
          {
            data: [confirmed, notConfirmed],
            backgroundColor: ["#00C49F", "#FF8042"],
          },
        ],
      });

      // Bar chart orders theo tháng
      const orderMonthCounts = Array(12).fill(0);
      ordersData.forEach((o) => {
        const d = new Date(o.created_at);
        orderMonthCounts[d.getMonth()] += 1;
      });
      setOrderBarData({
        labels: monthLabels,
        datasets: [
          {
            label: "Số đơn hàng",
            data: orderMonthCounts,
            backgroundColor: "#FFBB28",
          },
        ],
      });

      // Pie chart orders theo trạng thái
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
              <FaUserShield size={24} />
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

        {/* Menu */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/products">
              <FaBoxOpen /> {!collapsed && "Quản lý sản phẩm"}
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <FaShoppingCart /> {!collapsed && "Quản lý đơn hàng"}
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <FaUserShield /> {!collapsed && "Quản lý Users"}
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        {!loading && (
          <>
            <div style={{ marginBottom: "30px" }}>
              <h4>User: Đăng ký theo tháng</h4>
              <Bar
                data={userBarData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <h4>User: Email xác nhận / chưa xác nhận</h4>
              <Pie
                data={userPieData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <h4>Orders: Theo tháng</h4>
              <Bar
                data={orderBarData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <h4>Orders: Theo trạng thái</h4>
              <Pie
                data={orderPieData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
          </>
        )}
        <Outlet /> {/* render AdminUsersPage hoặc AdminOrdersPage */}
      </main>
    </div>
  );
}
