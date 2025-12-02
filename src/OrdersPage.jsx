import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient"; // file kết nối Supabase
import './assets/css/OrdersPage.css'

export default function OrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Hàm lấy trạng thái cho CSS
  const getStatusClass = (status) => {
    switch (status) {
      case "Đang giao":
        return "status-shipping";
      case "Đã giao":
        return "status-delivered";
      case "Đã hủy":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  // Fetch đơn hàng từ Supabase
  const fetchOrders = async (userName) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`*, order_items(*)`)
      .eq('customer', userName)
      .order('date', { ascending: false });

    if (error) {
      console.error("Lỗi fetch đơn hàng:", error);
      setOrders([]);
      setFilteredOrders([]);
    } else {
      const formattedOrders = data.map(order => ({
        id: order.id,
        date: new Date(order.date).toLocaleDateString("vi-VN"),
        status: order.status,
        total: order.total,
        customer: order.customer,
        phone: order.phone,
        address: order.address,
        payment: order.payment,
        items: order.order_items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      }));
      setOrders(formattedOrders);
      setFilteredOrders(formattedOrders);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchOrders(parsedUser.name); // gọi Supabase theo user hiện tại
    }
  }, []);

  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) =>
        order.id.toLowerCase().includes(searchId.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Tra Cứu Đơn Hàng</h1>
        <p>Theo dõi tình trạng đơn hàng của bạn</p>
      </div>

      {/* Search Box */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Nhập mã đơn hàng (VD: DH001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>Không tìm thấy đơn hàng nào</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header-card">
                  <div className="order-id">
                    <strong>Mã đơn:</strong> {order.id}
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-info">
                  <div className="info-row">
                    <span>📅 Ngày đặt:</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="info-row">
                    <span>👤 Khách hàng:</span>
                    <span>{order.customer}</span>
                  </div>
                  <div className="info-row">
                    <span>📞 SĐT:</span>
                    <span>{order.phone}</span>
                  </div>
                  <div className="info-row">
                    <span>💳 Thanh toán:</span>
                    <span>{order.payment}</span>
                  </div>
                </div>

                <div className="order-items">
                  <strong>Sản phẩm:</strong>
                  {order.items.map((item, index) => (
                    <div key={index} className="item-row">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <strong>Tổng tiền:</strong>
                  <span className="total-amount">{formatPrice(order.total)}</span>
                </div>

                <button
                  className="btn-detail"
                  onClick={() => setSelectedOrder(order)}
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Chi Tiết */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi Tiết Đơn Hàng</h2>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Thông tin đơn hàng</h3>
                <p><strong>Mã đơn:</strong> {selectedOrder.id}</p>
                <p><strong>Ngày đặt:</strong> {selectedOrder.date}</p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span className={getStatusClass(selectedOrder.status)}>{selectedOrder.status}</span>
                </p>
              </div>

              <div className="detail-section">
                <h3>Thông tin người nhận</h3>
                <p><strong>Họ tên:</strong> {selectedOrder.customer}</p>
                <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
              </div>

              <div className="detail-section">
                <h3>Sản phẩm</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="modal-item">
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <span className="item-quantity">Số lượng: {item.quantity}</span>
                    </div>
                    <div className="item-price">{formatPrice(item.price)}</div>
                  </div>
                ))}
              </div>

              <div className="detail-section">
                <h3>Thanh toán</h3>
                <p><strong>Phương thức:</strong> {selectedOrder.payment}</p>
                <div className="modal-total">
                  <strong>Tổng cộng:</strong>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
