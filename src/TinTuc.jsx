import React from "react";
import winterCoat from "./assets/images/xuhuongaomuadong.jpg";
import streetStyle from "./assets/images/streetstyle.jpg";
import bag2025 from "./assets/images/tuicaocap.jpg";
import sneaker from "./assets/images/giaysanhdieu.webp";

// Danh sách tin tức với hình minh họa trực tiếp
const newsItems = [
  {
    title: "🔥 Xu hướng áo khoác mùa đông",
    content:
      "Năm nay, các mẫu áo khoác dáng dài với tông màu trầm được yêu thích nhất.",
    image: winterCoat,
  },
  {
    title: "🌟 Street Style lên ngôi",
    content:
      "Quần jeans rách – giày sneaker – áo bomber vẫn đang thống trị các phố phường.",
    image: streetStyle,
  },
  {
    title: "👜 Túi xách cao cấp 2025",
    content:
      "Các mẫu túi xách mini và tote đang trở thành phụ kiện hot nhất mùa này.",
    image: bag2025,
  },
  {
    title: "👟 Sneaker sành điệu",
    content:
      "Sneaker màu sắc nổi bật kết hợp cùng outfit minimal đang được giới trẻ săn đón.",
    image: sneaker,
  },
];

export default function TinTuc() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: 1000, margin: "0 auto" }}>
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 25,
        }}
      >
        {newsItems.map((item, index) => (
          <div
            key={index}
            style={{
              borderRadius: 15,
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ width: "100%", height: 180, overflow: "hidden" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            <div style={{ padding: 20 }}>
              <h3
                style={{
                  fontSize: "1.3rem",
                  color: "#e52e71",
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "1rem", color: "#333", lineHeight: 1.6 }}>
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
