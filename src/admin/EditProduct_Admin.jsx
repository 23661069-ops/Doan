import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "../assets/css/quanlysp.css";

export default function EditProduct_Admin() {
  const { id } = useParams(); // "new" = thêm mới
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating_rate: 0,
    rating_count: 0,
  });
  const [loading, setLoading] = useState(false);

  // Nếu id khác "new", fetch dữ liệu để sửa
  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      supabase
        .from("product1")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            alert("Không tìm thấy sản phẩm: " + error.message);
            navigate("/admin/products");
          } else {
            setProduct(data);
          }
          setLoading(false);
        });
    }
  }, [id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (id === "new") {
      // Thêm mới
      const { error } = await supabase.from("product1").insert([product]);
      if (error) alert("Lỗi khi thêm sản phẩm: " + error.message);
      else navigate("/admin/products");
    } else {
      // Cập nhật
      const { error } = await supabase
        .from("product1")
        .update(product)
        .eq("id", id);
      if (error) alert("Lỗi khi cập nhật sản phẩm: " + error.message);
      else navigate("/admin/products");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>{id === "new" ? "Thêm sản phẩm mới" : "Sửa sản phẩm"}</h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Tên sản phẩm:
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Giá:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Hình ảnh (URL):
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
            />
          </label>

          <label>
            Đánh giá trung bình:
            <input
              type="number"
              name="rating_rate"
              value={product.rating_rate}
              step="0.1"
              min="0"
              max="5"
              onChange={handleChange}
            />
          </label>

          <label>
            Số lượt đánh giá:
            <input
              type="number"
              name="rating_count"
              value={product.rating_count}
              min="0"
              onChange={handleChange}
            />
          </label>

          <div style={{ marginTop: "10px" }}>
            <button type="submit" className="btn green">
              {id === "new" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            </button>
            <button
              type="button"
              className="btn red"
              style={{ marginLeft: "10px" }}
              onClick={() => navigate("/admin/products")}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
