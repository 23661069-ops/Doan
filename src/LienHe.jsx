import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { FaUser, FaEnvelope, FaPhone, FaTag, FaComment } from "react-icons/fa";

export default function LienHe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập Họ & Tên";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Email không hợp lệ";
    if (form.phone && !form.phone.match(/^[0-9]{9,12}$/))
      errs.phone = "Số điện thoại không hợp lệ";
    if (!form.message.trim()) errs.message = "Vui lòng nhập nội dung";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("contacts").insert([form]);
      if (error) throw error;
      setNotification({ message: "Gửi liên hệ thành công!", type: "success" });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setNotification({
        message: "Đã có lỗi xảy ra, vui lòng thử lại.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide notification sau 3 giây
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(
        () => setNotification({ message: "", type: "" }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const contactInfo = [
    { icon: "📞", label: "Hotline", value: "0398941795" },
    { icon: "📧", label: "Email", value: "yennhi405205@gmail.com" },
    {
      icon: "🏠",
      label: "Địa chỉ",
      value: "33 Vĩnh Viễn, Phường Vườn Lài, TP Hồ Chí Minh",
    },
  ];

  return (
    <div
      style={{
        padding: "50px 20px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Notification Snackbar */}
      {notification.message && (
        <div
          style={{
            position: "fixed",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px 25px",
            borderRadius: 10,
            backgroundColor:
              notification.type === "success" ? "#4BB543" : "#FF4C4C",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            animation: "slideUp 0.5s ease",
            zIndex: 9999,
          }}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <h1 style={titleStyle}>Liên Hệ Với Chúng Tôi</h1>
      <p style={subtitleStyle}>
        Hãy liên hệ để được tư vấn và hỗ trợ tốt nhất!
      </p>

      <div style={containerStyle}>
        {/* Thông tin liên hệ */}
        <div style={infoContainerStyle}>
          {contactInfo.map((item, index) => (
            <div key={index} style={cardStyle}>
              <span style={iconStyle}>{item.icon}</span>
              <div>
                <p style={cardLabelStyle}>{item.label}</p>
                <p style={cardValueStyle}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form liên hệ */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroupStyle}>
            <InputIcon
              icon={<FaUser />}
              placeholder="Họ & Tên"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputIcon
              icon={<FaEnvelope />}
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          <div style={formGroupStyle}>
            <InputIcon
              icon={<FaPhone />}
              placeholder="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <InputIcon
              icon={<FaTag />}
              placeholder="Tiêu đề"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <TextareaIcon
            icon={<FaComment />}
            placeholder="Nội dung"
            name="message"
            value={form.message}
            onChange={handleChange}
            error={errors.message}
          />
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Đang gửi..." : "Gửi Liên Hệ"}
          </button>
        </form>
      </div>

      {/* Map */}
      <div style={mapContainerStyle}>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2334562780666!2d106.67300131462263!3d10.755112992324792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9c9c0d1d13%3A0x123456789abcdef!2s33%20V%C4%ABnh%20Vi%E1%BB%87n%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C6%B0%E1%BB%9Dn%20L%C3%A0i%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Keyframes animation */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateX(-50%) translateY(50px); opacity: 0; }
            100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

// --- Input with icon ---
const InputIcon = ({ icon, error, ...props }) => (
  <div style={{ position: "relative", flex: 1 }}>
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 12,
        transform: "translateY(-50%)",
        color: "#888",
      }}
    >
      {icon}
    </div>
    <input
      {...props}
      style={{
        ...inputStyle,
        paddingLeft: 40,
        borderColor: error ? "red" : "#ddd",
      }}
    />
    {error && <span style={{ color: "red", fontSize: 12 }}>{error}</span>}
  </div>
);

const TextareaIcon = ({ icon, error, ...props }) => (
  <div style={{ position: "relative" }}>
    <div style={{ position: "absolute", top: 12, left: 12, color: "#888" }}>
      {icon}
    </div>
    <textarea
      {...props}
      style={{
        ...textareaStyle,
        paddingLeft: 40,
        borderColor: error ? "red" : "#ddd",
      }}
    />
    {error && <span style={{ color: "red", fontSize: 12 }}>{error}</span>}
  </div>
);

// --- Styles ---
const titleStyle = {
  fontSize: "2.8rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 10,
  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const subtitleStyle = {
  textAlign: "center",
  fontSize: "1.2rem",
  color: "#555",
  marginBottom: 50,
};

const containerStyle = {
  display: "flex",
  gap: 40,
  flexWrap: "wrap",
  marginBottom: 40,
};
const infoContainerStyle = {
  flex: 1,
  minWidth: 280,
  display: "flex",
  flexDirection: "column",
  gap: 25,
};
const cardStyle = {
  display: "flex",
  alignItems: "center",
  gap: 15,
  padding: 25,
  borderRadius: 15,
  background: "#fff",
  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  cursor: "default",
};
const iconStyle = { fontSize: "2rem" };
const cardLabelStyle = { fontWeight: "600", margin: 0 };
const cardValueStyle = { margin: 0, color: "#333" };

const formStyle = {
  flex: 2,
  minWidth: 350,
  display: "flex",
  flexDirection: "column",
  gap: 20,
  background: "#fff",
  padding: 30,
  borderRadius: 15,
  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
};

const formGroupStyle = { display: "flex", gap: 15, flexWrap: "wrap" };
const inputStyle = {
  flex: 1,
  padding: "12px 15px",
  borderRadius: 10,
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "1rem",
  transition: "0.3s",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
};
const textareaStyle = { ...inputStyle, resize: "none", minHeight: 120 };
const buttonStyle = {
  padding: "14px 0",
  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
  color: "#fff",
  fontWeight: "600",
  fontSize: "1.1rem",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  transition: "0.3s",
  textAlign: "center",
};
const mapContainerStyle = {
  borderRadius: 15,
  overflow: "hidden",
  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
};
