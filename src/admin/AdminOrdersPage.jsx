import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("orders")
        .select("*", { count: "exact" })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      if (search.trim() !== "")
        query = query.ilike("customer_name", `%${search.trim()}%`);

      const { data, error, count } = await query;

      if (error) {
        toast.error("Lỗi khi tải danh sách đơn hàng: " + error.message);
        return;
      }

      setOrders(data);
      setTotal(count);
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, search, statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;
    try {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) toast.error("Lỗi khi xóa đơn hàng: " + error.message);
      else {
        toast.success("Xóa đơn hàng thành công!");
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi xóa đơn hàng.");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mt-4">
      <h3>Quản lý đơn hàng</h3>

      {/* Search & Filter */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo tên khách hàng..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xử lý</option>
            <option value="completed">Hoàn tất</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={fetchOrders}>
            Refresh
          </button>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <p>Đang tải danh sách...</p>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Điện thoại</th>
                <th>Địa chỉ</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Không có đơn hàng nào
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.customer_phone}</td>
                    <td>{order.customer_address}</td>
                    <td>{order.total_price}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(order.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <span>
              Trang {page} / {totalPages || 1} ({total} đơn hàng)
            </span>
            <div>
              <button
                className="btn btn-secondary btn-sm me-2"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
