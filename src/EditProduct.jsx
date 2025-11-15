import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import "./assets/css/quanlysp.css";

const EditProduct = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating_rate: "",
    rating_count: "",
  });

  useEffect(() => {
    if (!isNew) {
      supabase
        .from("product1")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => setProduct(data || {}));
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNew) {
      const { error } = await supabase.from("product1").insert([product]);
      if (error) return alert("Lỗi thêm: " + error.message);
      alert("✅ Đã thêm sản phẩm!");
    } else {
      const { error } = await supabase
        .from("product1")
        .update(product)
        .eq("id", id);
      if (error) return alert("Lỗi cập nhật: " + error.message);
      alert("✅ Đã cập nhật sản phẩm!");
    }
    navigate("/admin/products");
  };

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h2>{isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h2>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="form">
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
              Đánh giá (0–5):
              <input
                type="number"
                step="0.1"
                name="rating_rate"
                value={product.rating_rate}
                onChange={handleChange}
              />
            </label>

            <label>
              Số lượt đánh giá:
              <input
                type="number"
                name="rating_count"
                value={product.rating_count}
                onChange={handleChange}
              />
            </label>

            <div className="actions">
              <button
                type="button"
                className="btn gray"
                onClick={() => navigate("/admin/products")}
              >
                Hủy
              </button>
              <button type="submit" className="btn blue">
                {isNew ? "Thêm" : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
