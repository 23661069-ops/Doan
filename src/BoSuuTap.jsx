import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "./supabaseClient";

export default function BoSuuTap() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCollections = async () => {
      setLoading(true);
      setError("");
      try {
        const { data, error } = await supabase
          .from("bosuutap")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        setCollections(data || []);
      } catch (err) {
        console.error(err);
        setError("Không thể tải bộ sưu tập.");
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Đang tải bộ sưu tập...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Bộ Sưu Tập</h1>
      {collections.length === 0 ? (
        <p>Chưa có bộ sưu tập nào.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/bosuutap/${col.id}`}
              style={{
                textDecoration: "none",
                color: "black",
                border: "1px solid #ddd",
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff",
                transition: "0.2s",
              }}
            >
              {col.image && (
                <img
                  src={col.image}
                  alt={col.title}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
              )}
              <div style={{ padding: 10 }}>
                <h3 style={{ margin: 0 }}>{col.title}</h3>
                <p style={{ opacity: 0.7, marginTop: 5 }}>
                  {col.description || "Không có mô tả"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
