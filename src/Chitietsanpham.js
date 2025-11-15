// src/Chitietsanpham.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin sản phẩm theo id
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://68f97a99ef8b2e621e7c302b.mockapi.io/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Không thể tải sản phẩm!");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p style={{ padding: 20 }}>Đang tải dữ liệu...</p>;
  }

  if (error || !product) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Không tìm thấy sản phẩm!</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/trang1")}>Quay lại Trang 1</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ⬅ Quay lại
      </button>

      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "250px", height: "250px", objectFit: "contain" }}
        />
        <div>
          <h2>{product.title}</h2>
          <p>
            <strong>Giá:</strong> ${product.price}
          </p>
          <p>
            <strong>Loại:</strong> {product.category}
          </p>
          <p style={{ maxWidth: "400px" }}>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
