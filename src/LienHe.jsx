import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function KhuyenMai() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPromos = async () => {
      setLoading(true);
      try {
        // Lấy 10 sản phẩm khuyến mãi ngẫu nhiên
        const { data, error } = await supabase
          .from("khuyenmai")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        setPromos(data || []);
      } catch (err) {
        console.error("Lỗi lấy khuyến mãi:", err.message);
        setPromos([]);
      } finally {
        setLoading(false);
      }
    };

    loadPromos();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const found = cart.find((item) => item.id === product.product_id);

    if (found) found.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ!");
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Đang tải khuyến mãi...</p>;
  if (!promos.length)
    return <p style={{ textAlign: "center" }}>Chưa có khuyến mãi!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: 20 }}>Khuyến Mãi</h1>

      <div style={styles.grid}>
        {promos.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image || "/placeholder.png"}
              alt={p.title}
              style={styles.image}
            />

            <h4 style={styles.title}>
              {p.title.length > 40 ? p.title.slice(0, 40) + "..." : p.title}
            </h4>
            <p style={styles.price}>
              {p.discount ? `${p.discount}% giảm` : ""}
            </p>

            <div style={styles.buttonRow}>
              <Link to={`/sanpham/${p.product_id}`} style={styles.detailBtn}>
                Xem chi tiết
              </Link>

              <button onClick={() => addToCart(p)} style={styles.cartBtn}>
                <span style={{ marginRight: 6 }}>🛒</span>Thêm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================
// STYLE
// ============================
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 20,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    border: "1px solid #eee",
    transition: "0.2s ease",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 500,
    minHeight: 45,
  },
  price: {
    color: "#e64545",
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 12,
  },
  buttonRow: {
    display: "flex",
    marginTop: "auto",
    gap: 8,
  },
  detailBtn: {
    flex: 1,
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: 8,
    textAlign: "center",
    background: "#f1f3f5",
    color: "#333",
    fontSize: 14,
    textDecoration: "none",
  },
  cartBtn: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    background: "#000",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 500,
  },
};
