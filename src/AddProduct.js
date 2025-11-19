import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    rating_rate: 0,
    rating_count: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("product1").insert([form]);
    if (error) console.error(error);
    else navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Thêm sản phẩm</h2>

      <form onSubmit={addProduct} style={{ maxWidth: 400 }}>
        <input
          name="title"
          placeholder="Tên sản phẩm"
          onChange={handleChange}
        />
        <br />
        <input name="price" placeholder="Giá" onChange={handleChange} />
        <br />
        <input
          name="image"
          placeholder="Link hình ảnh"
          onChange={handleChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="Mô tả"
          onChange={handleChange}
        ></textarea>
        <br />

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
