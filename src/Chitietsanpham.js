import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "./supabaseClient";

export default function Chitietsanpham() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err.message);
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    // Demo: lưu vào localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (!product) return <p>Sản phẩm không tồn tại.</p>;

  return (
    <div style={{ padding: 20, display: "flex", gap: 20, flexWrap: "wrap" }}>
      {/* Ảnh sản phẩm */}
      <div style={{ flex: "1 1 300px" }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", borderRadius: 8, objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: 300,
              backgroundColor: "#eee",
              borderRadius: 8,
            }}
          />
        )}
      </div>

      {/* Thông tin sản phẩm */}
      <div style={{ flex: "1 1 300px" }}>
        <h2>{product.title}</h2>
        <p style={{ color: "#e63946", fontWeight: "bold", fontSize: "1.5rem" }}>
          Giá: ${product.price}
        </p>
        <p style={{ marginTop: 10 }}>{product.description}</p>

        <button
          onClick={addToCart}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            backgroundColor: "#a02020",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: 5,
          }}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
