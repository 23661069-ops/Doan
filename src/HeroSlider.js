import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Bộ sưu tập FW2025",
    subtitle: "Phong cách thời thượng",
    image: "https://placehold.co/1400x550/f0e8d9/303030?text=Slide+1",
  },
  {
    id: 2,
    title: "Khuyến mãi đặc biệt",
    subtitle: "Giảm giá lên đến 50%",
    image: "https://placehold.co/1400x550/f5f5f5/333333?text=Slide+2",
  },
  {
    id: 3,
    title: "Sản phẩm mới",
    subtitle: "Thời trang mùa đông",
    image: "https://placehold.co/1400x550/e0e0e0/000000?text=Slide+3",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {index === current && (
            <div className="overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button>Khám phá</button>
            </div>
          )}
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
