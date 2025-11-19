export default function LienHe() {
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
    <div style={{ padding: "40px 20px", maxWidth: 800, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          background: "linear-gradient(90deg, #ff8a00, #e52e71)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Liên Hệ Với Chúng Tôi
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.1rem",
          color: "#555",
          marginBottom: 40,
        }}
      >
        Hãy liên hệ để được tư vấn và hỗ trợ tốt nhất!
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {contactInfo.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#fff",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
          >
            <span style={{ fontSize: "1.8rem" }}>{item.icon}</span>
            <div>
              <p style={{ fontWeight: "600", margin: 0 }}>{item.label}</p>
              <p style={{ margin: 0, color: "#333" }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
