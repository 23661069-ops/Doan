import React, { useEffect, useState } from "react";
import "./assets/css/CartPage.css";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const normalized = storedCart.map((item) => ({
      id: item.id,
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

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
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
    <div className="cart-container">
      <h2 className="cart-title">Giỏ Hàng</h2>

      <div className="cart-header">
        <span>Sản phẩm</span>
        <span>Đơn giá</span>
        <span>Số lượng</span>
        <span>Thành tiền</span>
        <span>Thao tác</span>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty">Giỏ hàng trống</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-row">
            <div className="product-info">
              <img src={item.image_url} alt={item.name} />
              <span className="name">{item.name}</span>
            </div>

            <div className="price">{item.price.toLocaleString("vi-VN")}₫</div>

            <div className="quantity">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="subtotal">
              {(item.price * item.quantity).toLocaleString("vi-VN")}₫
            </div>

            <div className="remove">
              <button onClick={() => removeItem(item.id)}>Xóa</button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="total">
            Tổng thanh toán: <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Mua hàng
          </button>
        </div>
      )}
    </div>
  );
}
