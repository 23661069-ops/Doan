export default function TinTuc() {
  const newsItems = [
    {
      title: "🔥 Xu hướng áo khoác mùa đông",
      content:
        "Năm nay, các mẫu áo khoác dáng dài với tông màu trầm được yêu thích nhất.",
    },
    {
      title: "🌟 Street Style lên ngôi",
      content: "Quần jeans rách – giày sneaker – áo bomber vẫn đang thống trị.",
    },
  ];

  return (
    <div style={{ padding: "40px 20px", maxWidth: 900, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          background: "linear-gradient(90deg, #ff8a00, #e52e71)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Tin Tức Thời Trang
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.1rem",
          color: "#555",
          marginBottom: 40,
        }}
      >
        Cập nhật xu hướng thời trang 2025!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {newsItems.map((item, index) => (
          <div
            key={index}
            style={{
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#fff",
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
            <h3
              style={{
                fontSize: "1.4rem",
                marginBottom: 10,
                color: "#e63946",
                fontWeight: "600",
              }}
            >
              {item.title}
            </h3>
            <p style={{ color: "#333", lineHeight: 1.6 }}>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
