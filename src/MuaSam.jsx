import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { Link } from "react-router-dom";

export default function MuaSam() {
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("product1").select("*");

      // Nếu có lỗi, in ra console và trả về mảng rỗng
      if (error) {
        console.error("Supabase error:", error);
        setList([]);
        return;
      }

      // Nếu data = null → thay bằng []
      const safeData = data || [];

      // Sắp xếp mảng
      const sorted = safeData.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price
      );

      setList(sorted);
    };

    load();
  }, [sort]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mua Sắm</h1>

      <div style={{ marginBottom: 20 }}>
        <select
          onChange={(e) => setSort(e.target.value)}
          value={sort}
          style={{ padding: 8 }}
        >
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {list.map((p) => (
          <Link
            key={p.id}
            to={`/sanpham/${p.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <img
              src={p.image}
              alt=""
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <h4>{p.title}</h4>
            <p style={{ color: "#e63946", fontWeight: 600 }}>${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
