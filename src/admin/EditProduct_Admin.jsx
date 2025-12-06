import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "../assets/css/quanlysp.css";

export default function EditProduct_Admin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating_rate: 0,
    rating_count: 0,
  });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (id === "new") {
      const { error } = await supabase.from("product1").insert([product]);
      if (error) alert("Lỗi khi thêm sản phẩm: " + error.message);
      else navigate("/admin/products");
    } else {
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
    <div className="edit-container">
      <h2 className="title">
        {id === "new" ? "Thêm sản phẩm mới" : "Sửa sản phẩm"}
      </h2>

      {loading ? (
        <p className="loading">Đang tải...</p>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-left">
              <div className="input-group">
                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  required
                />
                <label>Tên sản phẩm</label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
                <label>Giá</label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  name="rating_rate"
                  value={product.rating_rate}
                  step="0.1"
                  min="0"
                  max="5"
                  onChange={handleChange}
                />
                <label>Đánh giá trung bình</label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  name="rating_count"
                  value={product.rating_count}
                  min="0"
                  onChange={handleChange}
                />
                <label>Số lượt đánh giá</label>
              </div>
            </div>

            {/* Right Column */}
            <div className="form-right">
              <div className="input-group">
                <input
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                />
                <label>Hình ảnh (URL)</label>
              </div>

              {product.image && (
                <div className="image-preview">
                  <img src={product.image} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-submit">
              {id === "new" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            </button>
            <button
              type="button"
              className="btn btn-cancel"
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
