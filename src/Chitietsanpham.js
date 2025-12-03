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
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name || product.title || "Sản phẩm",
        price: product.price || 0,
        image_url:
          product.image ||
          product.image_url ||
          product.img ||
          product.url ||
          "",
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (!product) return <p>Sản phẩm không tồn tại.</p>;

  return (
    <div style={{ padding: 20, display: "flex", gap: 20 }}>
      <div style={{ width: "350px" }}>
        <img
          src={
            product.image ||
            product.image_url ||
            product.img ||
            product.url ||
            ""
          }
          alt={product.name}
          style={{ width: "100%", borderRadius: 8 }}
        />
      </div>

      <div>
        <h2>{product.name}</h2>
        <p style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
          Giá: {product.price?.toLocaleString("vi-VN")}₫
        </p>
        <p>{product.description}</p>

        <button
          onClick={addToCart}
          style={{
            padding: "10px 20px",
            background: "#a02020",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
