import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function BoSuuTap() {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      const { data, error } = await supabase
        .from("collections") // bảng bộ sưu tập
        .select("*")
        .order("id", { ascending: true });
      if (error) console.error("Lỗi:", error.message);
      else setCollections(data);
    };
    fetchCollections();
  }, []);

  if (!collections.length) return <p>Đang tải bộ sưu tập...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bộ sưu tập</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {collections.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/bosuutap/${c.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={c.image}
              alt={c.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h4 style={{ marginTop: "10px" }}>{c.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
