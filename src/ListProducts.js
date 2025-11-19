import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data, error } = await supabase.from("product1").select("*");

    if (error) console.error(error);
    else setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa không?")) return;

    const { error } = await supabase.from("product1").delete().eq("id", id);
    if (error) console.error(error);
    else fetchData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Danh sách sản phẩm</h1>

      <button
        onClick={() => navigate("/add")}
        style={{
          margin: "20px 0",
          background: "green",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        ➕ Thêm sản phẩm
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <img
              src={p.image}
              alt=""
              style={{ width: "100%", height: 200, objectFit: "contain" }}
            />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <Link to={`/product/${p.id}`}>Xem chi tiết</Link> <br />
            <button
              onClick={() => navigate(`/edit/${p.id}`)}
              style={{
                background: "#007bff",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: 5,
                marginTop: 10,
                cursor: "pointer",
              }}
            >
              ✏️ Sửa
            </button>
            <button
              onClick={() => deleteProduct(p.id)}
              style={{
                background: "red",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: 5,
                marginTop: 10,
                cursor: "pointer",
                marginLeft: 10,
              }}
            >
              🗑 Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
