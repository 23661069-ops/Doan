import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

export default function ListProducts_SP() {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("product1").select("*");

      if (error) {
        console.error("Lỗi Supabase:", error);
        setProducts([]);
        return;
      }

      setProducts(Array.isArray(data) ? data : []);
    };

    load();
  }, []);

  if (products === null) return <p>Đang tải sản phẩm...</p>;
  if (products.length === 0) return <p>Không có sản phẩm!</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Sản phẩm</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
              background: "#fff",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            {/* Hình sản phẩm */}
            <img
              src={p.image || "/placeholder.png"}
              alt={p.title}
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            {/* Tên sản phẩm (Rút gọn 1 dòng) */}
            <h3
              style={{
                margin: "10px 0 5px",
                fontSize: "1rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={p.title}
            >
              {p.title}
            </h3>

            {/* Giá sản phẩm */}
            <p style={{ color: "#e63946", fontWeight: "bold" }}>
              {p.price ? p.price.toLocaleString("vi-VN") : "0"}₫
            </p>

            {/* Nút xem chi tiết luôn dưới cùng */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/sanpham/${p.id}`);
              }}
              style={{
                marginTop: "auto",
                padding: "8px 12px",
                cursor: "pointer",
                background: "#222",
                color: "white",
                border: "none",
                borderRadius: 5,
                fontSize: "0.9rem",
              }}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
