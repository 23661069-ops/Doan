import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Fall / Winter 2025",
    subtitle: "Khám phá phong cách thời trang mới",
    image: "banner.jpg",
  },
  {
    id: 2,
    title: "Ưu đãi độc quyền",
    subtitle: "Giảm đến 50% – Áp dụng toàn bộ cửa hàng",
    image: "/img/slide2.jpg",
  },
  {
    id: 3,
    title: "New Arrival 2025",
    subtitle: "Những thiết kế thời trang mới nhất",
    image: "/img/slide3.jpg",
  },
];

const sliderStyles = `
.hero-slider-container {
  position: relative;
  width: 100%;
  height: 650px;
  overflow: hidden;
  background-color: #000;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 1.2s ease, transform 1.8s ease;
}

.hero-slide.active {
  opacity: 1;
  transform: scale(1);
}

.slide-content-wrapper {
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay-blur {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.05),
    rgba(0,0,0,0.25),
    rgba(0,0,0,0.6)
  );
}

.text-box {
  position: absolute;
  bottom: 18%;
  left: 10%;
  color: #fff;
  z-index: 20;
  animation: fadeUp 1.2s ease forwards;
  opacity: 0;
}

.hero-slide.active .text-box {
  opacity: 1;
}

.text-box h2 {
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 2px;
}

.text-box p {
  font-size: 1.4rem;
  margin: 12px 0 25px;
  max-width: 600px;
}

.cta-button {
  padding: 12px 26px;
  background: linear-gradient(120deg, #a02020, #e63946);
  color: #fff;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 50px;
  text-transform: uppercase;
  transition: transform .2s ease;
}

.cta-button:hover {
  transform: scale(1.06);
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255,255,255,0.2);
  border: none;
  cursor: pointer;
  padding: 12px 15px;
  font-size: 2.2rem;
  z-index: 30;
  color: white;
  border-radius: 50%;
  backdrop-filter: blur(6px);
}

.prev { left: 30px; }
.next { right: 30px; }

.dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  display: flex;
  gap: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: 0.3s;
}

.dot.active {
  background-color: #e63946;
  transform: scale(1.3);
}

@keyframes fadeUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = sliderStyles;
    document.head.appendChild(styleTag);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

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
            <div className="overlay-blur"></div>

            <div className="text-box">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className="cta-button">Khám phá ngay</button>
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
