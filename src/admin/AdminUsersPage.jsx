import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("users")
        .select("id, email, role, password_hash", { count: "exact" })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (roleFilter !== "all") query = query.eq("role", roleFilter);
      if (search.trim() !== "")
        query = query.ilike("email", `%${search.trim()}%`);

      const { data, error, count } = await query;

      if (error) {
        toast.error("Lỗi khi tải danh sách users: " + error.message);
        return;
      }

      setUsers(data);
      setTotal(count);
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa user này?")) return;
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) toast.error("Lỗi khi xóa user: " + error.message);
      else {
        toast.success("Xóa user thành công!");
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi xóa user.");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mt-4">
      <h3>Quản lý Users</h3>

      {/* Search & Filter */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo email..."
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
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">Tất cả</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={fetchUsers}>
            Refresh
          </button>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <p>Đang tải danh sách...</p>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Mã băm (Hash)</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Không có user nào
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td
                      style={{
                        fontFamily: "monospace",
                        wordBreak: "break-all",
                      }}
                    >
                      {user.password_hash || "(Chưa có)"}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
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
              Trang {page} / {totalPages || 1} ({total} user)
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
