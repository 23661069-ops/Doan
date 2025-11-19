import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data || null);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Không tìm thấy sản phẩm.</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: 20 }}>
          ← Quay lại
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "30px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          padding: "8px 14px",
          borderRadius: 6,
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Quay lại
      </button>

      <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.title || "Product"}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div style={{ flex: "1 1 300px" }}>
          <h2>{product.title || "Chưa có tên sản phẩm"}</h2>
          <p
            style={{ fontSize: "1.2rem", color: "#e63946", fontWeight: "bold" }}
          >
            ${product.price ?? "0"}
          </p>
          <p style={{ marginTop: 20, color: "#333", lineHeight: 1.6 }}>
            {product.description || "Chưa có mô tả cho sản phẩm này."}
          </p>
        </div>
      </div>
    </div>
  );
}
