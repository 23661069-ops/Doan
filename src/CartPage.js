import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const normalized = storedCart.map((item) => ({
      id: item.id,
      color: item.color || "",
      size: item.size || "",
      name: item.name || "Sản phẩm",
      price: item.price || 0,
      quantity: item.quantity || 1,
      image_url:
        item.image_url ||
        item.image ||
        item.img ||
        item.url ||
        "https://via.placeholder.com/100",
    }));

    setCartItems(normalized);
  }, []);

  const updateQuantity = (id, color, size, quantity) => {
    if (quantity < 1) return;

    const updated = cartItems.map((item) =>
      item.id === id && item.color === color && item.size === size
        ? { ...item, quantity }
        : item
    );

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id, color, size) => {
    const updated = cartItems.filter(
      (item) => !(item.id === id && item.color === color && item.size === size)
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert(`Thanh toán: ${totalPrice.toLocaleString("vi-VN")}₫`);
    localStorage.removeItem("cart");
    setCartItems([]);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto", color: "#111", background: "#fff", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Giỏ Hàng</h2>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", fontWeight: "bold", padding: "10px 0", borderBottom: "2px solid #ccc" }}>
        <span>Sản phẩm</span>
        <span>Đơn giá</span>
        <span>Số lượng</span>
        <span>Thành tiền</span>
        <span>Thao tác</span>
      </div>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={`${item.id}-${item.color}-${item.size}`}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={item.image_url} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }} />
              <div>
                <div>{item.name}</div>
                {item.color && <div>Color: {item.color}</div>}
                {item.size && <div>Size: {item.size}</div>}
              </div>
            </div>

            <div>{item.price.toLocaleString("vi-VN")}₫</div>

            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.color, item.size, item.quantity - 1)
                }
                style={{ padding: "4px 8px", cursor: "pointer" }}
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item.id,
                    item.color,
                    item.size,
                    Number(e.target.value)
                  )
                }
                style={{ width: 50, textAlign: "center" }}
              />
              <button
                onClick={() =>
                  updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                }
                style={{ padding: "4px 8px", cursor: "pointer" }}
              >
                +
              </button>
            </div>

            <div>{(item.price * item.quantity).toLocaleString("vi-VN")}₫</div>

            <div>
              <button
                onClick={() => removeItem(item.id, item.color, item.size)}
                style={{ padding: "4px 10px", cursor: "pointer", background: "#111", color: "#fff", border: "none", borderRadius: 4 }}
              >
                Xóa
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 18, fontWeight: "bold" }}>
            Tổng thanh toán: <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
          </div>
          <button
            onClick={handleCheckout}
            style={{
              padding: "12px 25px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Mua hàng
          </button>
        </div>
      )}
    </div>
  );
}
