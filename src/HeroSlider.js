import React, { useState, useEffect } from "react";
import banner from "./assets/images/banner.webp";
import banner1 from "./assets/images/banner1.jpg";
import banner2 from "./assets/images/banner2.webp";

const slides = [
  {
    id: 1,
    title: "Bộ sưu tập FW2025",
    subtitle: "Phong cách thời thượng",
    image: banner,
  },
  {
    id: 2,
    title: "Khuyến mãi đặc biệt",
    subtitle: "Giảm giá lên đến 50%",
    image: banner1,
  },
  {
    id: 3,
    title: "Sản phẩm mới",
    subtitle: "Thời trang mùa đông",
    image: banner2,
  },
];

const shopeeHeroStyles = `
.hero-slider-container {
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

/* Slide */
.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.8s ease, transform 1.2s ease;
}
.hero-slide.active {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

/* Background */
.slide-content-wrapper {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Overlay nhẹ kiểu Shopee */
.slide-overlay-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.15),
    rgba(0,0,0,0.35)
  );
  z-index: 5;
}

/* Text block */
.overlay {
  position: absolute;
  z-index: 20;
  bottom: 80px;
  left: 50px;
  color: white;
  animation: fadeLeft 0.9s ease forwards;
  opacity: 0;
}
@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

.overlay h2 {
  font-size: 2.8rem;
  font-weight: 700;
  text-shadow: 0 3px 8px rgba(0,0,0,0.4);
}

.overlay p {
  margin: 8px 0 18px;
  font-size: 1.25rem;
  color: #ffecec;
}

/* CTA button kiểu Shopee */
.cta-button {
  padding: 12px 50px;
  background: #ff5722;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}
.cta-button:hover {
  background: #e64a19;
}

/* Left/Right arrows */
.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.7);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
}
.prev:hover, .next:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}
.prev { left: 15px; }
.next { right: 15px; }

/* Dots nhỏ gọn */
.dots {
  position: absolute;
  bottom: 22px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 40;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: 0.25s;
}
.dot.active {
  background: #ff5722;
  width: 22px;
  border-radius: 20px;
}
.dot:hover {
  transform: scale(1.2);
}
`;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    if (!document.getElementById("shopee-slider-styles")) {
      const styleTag = document.createElement("style");
      styleTag.textContent = shopeeHeroStyles;
      styleTag.id = "shopee-slider-styles";
      document.head.appendChild(styleTag);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  return (
    <div className="hero-slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          <div
            className="slide-content-wrapper"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay-bg"></div>

            {/* Text */}
            <div className="overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className="cta-button">Khám phá ngay</button>
            </div>
          </div>
        </div>
      ))}

      <button
        className="prev"
        onClick={() => setCurrent((current - 1 + length) % length)}
      >
        ❮
      </button>
      <button
        className="next"
        onClick={() => setCurrent((current + 1) % length)}
      >
        ❯
      </button>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
