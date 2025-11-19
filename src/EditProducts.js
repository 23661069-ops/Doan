import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await supabase
        .from("product1")
        .select("*")
        .eq("id", id)
        .single();
      setForm(data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    await supabase.from("product1").update(form).eq("id", id);
    navigate("/");
  };

  if (!form) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Sửa sản phẩm</h2>

      <form onSubmit={updateProduct} style={{ maxWidth: 400 }}>
        <input name="title" value={form.title} onChange={handleChange} />
        <br />
        <input name="price" value={form.price} onChange={handleChange} />
        <br />
        <input name="image" value={form.image} onChange={handleChange} />
        <br />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <br />

        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
}
