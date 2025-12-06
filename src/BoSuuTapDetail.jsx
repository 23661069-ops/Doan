// BoSuuTapDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "./supabaseClient";

export default function BoSuuTapDetail() {
  const { id } = useParams(); // id bộ sưu tập
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("asc");

  // Load sản phẩm của bộ sưu tập
  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("bosuutap_items")
          .select("product1(*)")
          .eq("collection_id", id);

        if (error) {
          console.error("Supabase error:", error);
          setList([]);
          return;
        }

        const products = (data || [])
          .map((i) => i.product1)
          .filter(Boolean);

        const sorted = [...products].sort((a, b) =>
          sort === "asc" ? a.price - b.price : b.price - a.price
        );

        setList(sorted);
      } catch (err) {
        console.error(err);
        setList([]);
      }
    };
    load();
  }, [id, sort]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const found = cart.find((item) => item.id === product.id);
    if (found) found.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: 20 }}>Bộ Sưu Tập #{id}</h1>

      {/* SORT */}
      <div style={styles.filterBar}>
        <label style={styles.filterLabel}>Sắp xếp:</label>
        <select
          onChange={(e) => setSort(e.target.value)}
          value={sort}
          style={styles.selectBox}
        >
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* PRODUCT LIST */}
      <div style={styles.grid}>
        {list.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image || p.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={p.title}
              style={styles.image}
            />

            {/* TITLE */}
            <h4 style={styles.title}>
              {p.title.length > 40 ? p.title.slice(0, 40) + "..." : p.title}
            </h4>

            {/* PRICE */}
            <p style={styles.price}>
              {p.price.toLocaleString("vi-VN")}₫
            </p>

            {/* BUTTON ROW */}
            <div style={styles.buttonRow}>
              <Link to={`/sanpham/${p.id}`} style={styles.detailBtn}>
                Xem chi tiết
              </Link>

              <button
                onClick={() => addToCart(p)}
                style={styles.cartBtn}
              >
                <span style={{ marginRight: 6 }}>🛒</span>
                Thêm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================
      STYLE — Giống MuaSam
============================= */
const styles = {
  filterBar: {
    marginBottom: 20,
    padding: "12px 16px",
    background: "#f8f9fa",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  filterLabel: { fontWeight: "bold" },

  selectBox: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 14,
    cursor: "pointer",
  },

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
