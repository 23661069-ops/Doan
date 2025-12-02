import React, { useState, useEffect } from "react";
import './assets/css/CartPage.css'; // CSS riêng cho CartPage

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div className="cart-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()}đ</span>
              </div>
              <div className="item-controls">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                />
                <button onClick={() => removeItem(item.id)}>Xóa</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <strong>Tổng cộng:</strong> {totalPrice.toLocaleString()}đ
          </div>
        </div>
      )}
    </div>
  );
}
