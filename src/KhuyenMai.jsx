import React from "react";

export default function KhuyenMai() {
  const promotions = [
    { id: 1, text: "Giảm 50% toàn bộ giày sneaker", icon: "🔥" },
    { id: 2, text: "Mua 2 áo thun tặng 1", icon: "🎁" },
    { id: 3, text: "Freeship đơn từ 499k", icon: "🚚" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#e63946", marginBottom: "20px" }}>Khuyến Mãi</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
        Các chương trình giảm giá đang diễn ra:
      </p>

      <div style={{ display: "grid", gap: "15px", maxWidth: "600px" }}>
        {promotions.map((promo) => (
          <div
            key={promo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px",
              borderRadius: "8px",
              background: "#ffe5e0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              fontWeight: "bold",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{promo.icon}</span>
            <span>{promo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
