import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function BoSuuTapDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("Lỗi:", error.message);
      else setCollection(data);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("product1")
        .select("*")
        .eq("collection_id", id); // lấy sản phẩm theo bộ sưu tập
      if (error) console.error("Lỗi:", error.message);
      else setProducts(data);
    };

    fetchCollection();
    fetchProducts();
  }, [id]);

  if (!collection) return <p>Đang tải chi tiết bộ sưu tập...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>← Quay lại</button>
      <h1>{collection.name}</h1>
      <img
        src={collection.image}
        alt={collection.name}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <p>{collection.description}</p>

      <h2>Sản phẩm trong bộ sưu tập</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h4>{p.title}</h4>
            <p style={{ color: "#e63946", fontWeight: "bold" }}>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
