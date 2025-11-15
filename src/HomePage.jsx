import React from "react";

// Sản phẩm mẫu
const products = [
  {
    id: 1,
    name: "Váy Dạ Hội Sang Trọng",
    description: "Thiết kế tinh tế, tôn dáng, phù hợp mọi dịp quan trọng.",
    price: "1.200.000đ",
    image: "https://example.com/images/dress1.jpg",
  },
  {
    id: 2,
    name: "Áo Blouse Nữ",
    description: "Phong cách nhẹ nhàng, thoải mái, dễ phối đồ hàng ngày.",
    price: "350.000đ",
    image: "https://example.com/images/blouse1.jpg",
  },
  {
    id: 3,
    name: "Túi Xách Thời Trang",
    description:
      "Thiết kế hiện đại, chất liệu cao cấp, phối được với nhiều outfit.",
    price: "750.000đ",
    image: "https://example.com/images/bag1.jpg",
  },
  {
    id: 4,
    name: "Giày Cao Gót Nữ",
    description: "Kiểu dáng thanh lịch, mang êm chân, tôn chiều cao.",
    price: "900.000đ",
    image: "https://example.com/images/shoes1.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Section: Banner giới thiệu */}
      <section className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Phong cách thời trang nữ</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá bộ sưu tập thời trang nữ mới nhất, từ váy đầm sang trọng đến
          phụ kiện hiện đại.
        </p>
      </section>

      {/* Section: Bộ sưu tập nổi bật */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Sản phẩm nổi bật
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3">
                  {product.description}
                </p>
                <p className="text-red-600 font-bold mb-3">{product.price}</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  Mua ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Giới thiệu thương hiệu */}
      <section className="mb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Về thương hiệu</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi mang đến những thiết kế thời trang nữ mới nhất, chất lượng
          cao và dịch vụ tận tâm. Luôn cập nhật xu hướng để bạn luôn tự tin tỏa
          sáng.
        </p>
      </section>

      {/* Section: Call to action */}
      <section className="text-center bg-gray-100 py-12 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Đặt hàng ngay hôm nay!</h2>
        <p className="text-gray-600 mb-6">
          Liên hệ với chúng tôi để được tư vấn phong cách và đặt sản phẩm yêu
          thích.
        </p>
        <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
          Liên hệ ngay
        </button>
      </section>
    </div>
  );
}
