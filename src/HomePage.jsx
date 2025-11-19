import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Bộ sưu tập FW2025",
    subtitle: "Phong cách thời thượng",
    image: "banner",
    dummyText: "Slide 1",
  },
  {
    id: 2,
    title: "Khuyến mãi đặc biệt",
    subtitle: "Giảm giá lên đến 50%",
    image: "/path/to/your/image_2.jpg",
    dummyText: "Slide 2",
  },
  {
    id: 3,
    title: "Sản phẩm mới",
    subtitle: "Thời trang mùa đông",
    image: "/path/to/your/image_3.jpg",
    dummyText: "Slide 3",
  },
];
const sliderStyles = `
.hero-slider-container {
  position: relative;
  width: 100%;
  height: 550px; 
  overflow: hidden; /* Quan trọng: ẩn các slide không hoạt động */
  background-color: #f0e8d9; 
}
.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out; /* Hiệu ứng chuyển mượt mà */
}

.hero-slide.active {
  opacity: 1; 
  z-index: 10; 
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
.slide-dummy-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25rem; 
    color: rgba(48, 48, 48, 0.9); 
    font-weight: 900;
    z-index: 5; 
    line-height: 1;
    pointer-events: none; 
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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  padding: 15px 10px;
  font-size: 1.5rem;
  z-index: 30;
  color: #303030;
  opacity: 0.6;
}

.prev { left: 20px; }
.next { right: 20px; }

.dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.5;
  cursor: pointer;
  border: 1px solid #303030;
  transition: all 0.3s;
}

.dot.active {
  opacity: 1;
  background-color: #a02020; 
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
    styleTag.setAttribute("id", "hero-slider-styles");
    document.head.appendChild(styleTag);

    return () => {
      const existingStyle = document.getElementById("hero-slider-styles");
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
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
            <div className="slide-dummy-text">{slide.dummyText}</div>
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
