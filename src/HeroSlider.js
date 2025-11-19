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

const baseSliderStyles = `
.hero-slider-container {
  position: relative;
  width: 100%;
  height: 550px; 
  overflow: hidden; 
  background-color: #f0e8d9; 
}
.hero-slide {
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slide-content-wrapper {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.overlay {
  position: relative; 
  text-align: center;
  color: #303030;
  z-index: 20; 
}
.overlay h2 { 
  font-size: 3rem; 
  margin-bottom: 0.5rem; 
  font-weight: bold; 
}
.overlay p { 
  font-size: 1.5rem; 
  margin-bottom: 1.5rem; 
}
.cta-button {
  padding: 10px 20px;
  background-color: #a02020; 
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}

.prev, .next {
  position: absolute; top: 50%; transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.3); border: none; cursor: pointer;
  padding: 15px 10px; font-size: 1.5rem; z-index: 30; color: #303030; opacity: 0.6;
  transition: opacity 0.3s;
}
.prev:hover, .next:hover { opacity: 1; }
.prev { left: 20px; }
.next { right: 20px; }
.dots {
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
  z-index: 30; display: flex; gap: 10px;
}
.dot {
  width: 10px; height: 10px; border-radius: 50%; background-color: #fff;
  opacity: 0.5; cursor: pointer; border: 1px solid #303030; transition: all 0.3s;
}
.dot.active { opacity: 1; background-color: #a02020; }
`;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    if (!document.getElementById("hero-slider-base-styles")) {
      const styleTag = document.createElement("style");
      styleTag.textContent = baseSliderStyles;
      styleTag.setAttribute("id", "hero-slider-base-styles");
      document.head.appendChild(styleTag);
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="hero-slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="hero-slide"
          style={{
            display: index === current ? "block" : "none",
            zIndex: index === current ? 10 : 0,
            opacity: index === current ? 1 : 0,
          }}
        >
          <div
            className="slide-content-wrapper"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className="cta-button">Khám phá</button>
            </div>
          </div>
        </div>
      ))}

      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
      </button>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
