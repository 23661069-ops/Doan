import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  // Biến thể
  const COLORS = ["Đen", "Trắng", "Hồng", "Be"];
  const SIZES = ["S", "M", "L", "XL"];

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Load product
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

  // Load gợi ý (cùng category)
  useEffect(() => {
    if (!product) return;

    const loadSuggestions = async () => {
      const { data } = await supabase
        .from("product1")
        .select("*")
        .eq("category", product.category)
        .neq("id", product.id)
        .limit(10);

      setSuggestions(data || []);
    };

    loadSuggestions();
  }, [product]);

  // -------- ADD TO CART ----------
  const addToCart = () => {
    if (!product) return;

    if (!selectedColor || !selectedSize) {
      alert("Hãy chọn màu và size trước!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

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
        color: selectedColor,
        size: selectedSize,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  // =====================================================================
  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (!product) return <p>Sản phẩm không tồn tại.</p>;
  const image =
    product.image || product.image_url || product.img || product.url || "";
  // =====================================================================

  return (
    <div style={{ maxWidth: 1150, margin: "20px auto", color: "#111", background: "#fff" }}>
      {/* ======= Khung chính ========= */}
      <div
        style={{
          padding: 20,
          display: "flex",
          gap: 30,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* ảnh */}
        <div
          style={{
            width: 420,
            height: 420,
            background: "#f9f9f9",
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={image}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Thông tin */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: 10 }}>{product.name || product.title}</h2>

          {/* đánh giá */}
          <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
            <span style={{ color: "#FFD700", fontWeight: "bold" }}>★★★★★</span>
            <span style={{ color: "#444" }}>
              {product.reviews || 152} đánh giá
            </span>
            <span
              style={{
                color: "#444",
                borderLeft: "1px solid #ccc",
                paddingLeft: 10,
              }}
            >
              {product.sold || 4200} đã bán
            </span>
          </div>

          {/* giá */}
          <p
            style={{
              fontSize: "2rem",
              color: "#111",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {product.price?.toLocaleString("vi-VN")}₫
          </p>

          {/* màu */}
          <div style={{ marginTop: 25 }}>
            <h4>Màu sắc</h4>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 6,
                    border:
                      selectedColor === c
                        ? "2px solid #111"
                        : "1px solid #ccc",
                    cursor: "pointer",
                    background: "#fff",
                    color: "#111",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* size */}
          <div style={{ marginTop: 25 }}>
            <h4>Kích thước</h4>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    border:
                      selectedSize === s
                        ? "2px solid #111"
                        : "1px solid #ccc",
                    cursor: "pointer",
                    background: "#fff",
                    color: "#111",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* mô tả */}
          <p style={{ marginTop: 20, lineHeight: 1.5 }}>
            {product.description || "Không có mô tả cho sản phẩm này."}
          </p>

          {/* nút */}
          <div style={{ marginTop: 30, display: "flex", gap: 15 }}>
            <button
              onClick={addToCart}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 6,
                border: "none",
                background: "#111",
                color: "#fff",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Thêm vào giỏ hàng
            </button>

            <button
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 6,
                border: "none",
                background: "#111",
                color: "#fff",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
              onClick={() => alert("Chức năng mua ngay")}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* ==========================
           GỢI Ý SẢN PHẨM
      ========================== */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ marginBottom: 15 }}>Sản phẩm gợi ý dành cho bạn</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 20,
          }}
        >
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 10,
                cursor: "pointer",
                background: "#fff",
              }}
            >
              <img
                src={
                  item.image ||
                  item.image_url ||
                  item.img ||
                  item.url ||
                  "https://via.placeholder.com/200"
                }
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />

              <p
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  minHeight: 40,
                  color: "#111",
                }}
              >
                {item.name || item.title}
              </p>

              <p style={{ color: "#111", fontWeight: 600 }}>
                {item.price?.toLocaleString("vi-VN")}₫
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
