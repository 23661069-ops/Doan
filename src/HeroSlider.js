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

const improvedStyles = `
.hero-slider-container {
  position: relative;
  width: 100%;
  height: 550px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

/* --- Slide fade effect --- */
.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
.hero-slide.active {
  opacity: 1;
  z-index: 10;
}

/* --- Background --- */
.slide-content-wrapper {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

/* --- Overlay mờ để nổi bật text --- */
.slide-overlay-bg {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1px);
  z-index: 5;
}

/* --- Text overlay --- */
.overlay {
  position: absolute;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  animation: fadeUp 1s ease forwards;
  opacity: 0;
}
@keyframes fadeUp {
  0% { opacity: 0; transform: translate(-50%, -40%); }
  100% { opacity: 1; transform: translate(-50%, -50%); }
}

.overlay h2 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.overlay p {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

/* --- Elegant Button --- */
.cta-button {
  padding: 12px 35px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: 0.3s ease;
}
.cta-button:hover {
  background: #fff;
  color: #000;
}

/* --- Navigation buttons --- */
.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.4);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 30;
  transition: 0.3s ease;
}
.prev:hover, .next:hover {
  background: rgba(255,255,255,0.9);
  transform: translateY(-50%) scale(1.1);
}
.prev { left: 20px; }
.next { right: 20px; }

/* --- Dots --- */
.dots {
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 30;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #fff;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: 0.3s ease;
}
.dot.active {
  background: white;
}
.dot:hover {
  transform: scale(1.2);
}
`;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    if (!document.getElementById("improved-slider-styles")) {
      const styleTag = document.createElement("style");
      styleTag.textContent = improvedStyles;
      styleTag.id = "improved-slider-styles";
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

            <div className="overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className="cta-button">Khám phá</button>
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
