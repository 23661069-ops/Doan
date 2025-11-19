import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setForm({
          title: data.title,
          price: data.price,
          image: data.image,
          description: data.description,
        });
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("product1")
        .update(form)
        .eq("id", id);
      if (error) throw error;
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
      alert("Lỗi khi cập nhật sản phẩm. Xem console để biết chi tiết.");
    }
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Link hình ảnh:</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Mô tả:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
