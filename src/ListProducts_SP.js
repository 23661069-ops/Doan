import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

export default function ListProducts_SP() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("product1").select("*");
      if (!error) setProducts(data);
    };
    load();
  }, []);

  if (!products || products.length === 0) return <p>Đang tải sản phẩm...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Sản phẩm</h1>
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
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <img
              src={p.image || "/placeholder.png"}
              alt={p.title}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{p.title}</h3>
            <p style={{ color: "#e63946", fontWeight: "bold" }}>
              Giá: ${p.price}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/sanpham/${p.id}`);
              }}
              style={{ marginTop: 10, padding: "5px 10px", cursor: "pointer" }}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
