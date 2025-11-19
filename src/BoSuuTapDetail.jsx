import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "./supabaseClient";

export default function BoSuuTapDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        // Lấy sản phẩm trong bộ sưu tập từ bảng bosuutap_items
        const { data: items, error: itemError } = await supabase
          .from("bosuutap_items")
          .select("product1(*)") // join tới bảng product1
          .eq("collection_id", id);

        if (itemError) throw itemError;

        // Lấy danh sách sản phẩm, loại bỏ null
        const productList = items.map((item) => item.product1).filter(Boolean);

        setProducts(productList);
      } catch (err) {
        console.error(err);
        setError("Không thể tải sản phẩm của bộ sưu tập này.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Đang tải sản phẩm...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  if (!products.length)
    return (
      <p style={{ padding: 20 }}>Chưa có sản phẩm nào trong bộ sưu tập này.</p>
    );

  return (
    <div style={{ padding: 20 }}>
      <h2>Bộ Sưu Tập #{id}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
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
              alt={p.title}
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
