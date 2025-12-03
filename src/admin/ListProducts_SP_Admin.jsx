import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "../assets/css/quanlysp.css";

const ListProducts_SP_Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch dữ liệu sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error("Lỗi:", error.message);
    else setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (!confirm) return;

    const { error } = await supabase.from("product1").delete().eq("id", id);
    if (error) alert("Lỗi khi xóa: " + error.message);
    else fetchProducts(); // Reload danh sách
  };

  return (
    <div className="container">
      <div className="table-actions">
        <button
          className="btn green"
          onClick={() => navigate("/admin/edit/new")}
        >
          ➕ Thêm mới
        </button>
      </div>

      <h2>Quản lý sản phẩm (Admin)</h2>

      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : products.length === 0 ? (
        <p>Chưa có sản phẩm nào.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Đánh giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.title} className="thumb" />
                </td>
                <td>{p.title}</td>
                <td>{p.price?.toLocaleString()}₫</td>
                <td>
                  ⭐ {p.rating_rate || 0} ({p.rating_count || 0})
                </td>
                <td>
                  <button
                    className="btn yellow"
                    title="Sửa sản phẩm"
                    onClick={() => navigate(`/admin/edit/${p.id}`)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn red"
                    title="Xóa sản phẩm"
                    onClick={() => handleDelete(p.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListProducts_SP_Admin;
