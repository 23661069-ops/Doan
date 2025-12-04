import React, { useState } from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

// Hàm tạo hash SHA-256
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.trim()) return alert("Vui lòng nhập email hợp lệ!");
    if (password !== confirm) return alert("Mật khẩu xác nhận không khớp!");
    if (password.length < 6) return alert("Mật khẩu phải ít nhất 6 ký tự!");

    setLoading(true);

    // 1️⃣ Tạo mã băm của mật khẩu
    const passwordHash = await sha256(password);

    // 2️⃣ Đăng ký tài khoản Supabase (vẫn dùng mật khẩu gốc)
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { role } },
    });

    if (error) {
      alert("Lỗi: " + error.message);
      setLoading(false);
      return;
    }

    // 3️⃣ Lấy user id do Supabase tạo
    const userId = data.user.id;

    // 4️⃣ Lưu mã băm vào bảng users
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        id: userId,
        email,
        role,
        password_hash: passwordHash,
      });

    if (insertError) {
      alert("Lỗi khi lưu vào bảng users: " + insertError.message);
    } else {
      alert(
        "Đăng ký thành công! Mật khẩu đã được băm theo yêu cầu đồ án."
      );
      setEmail("");
      setPassword("");
      setConfirm("");
      setRole("user");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Quyền người dùng</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}
