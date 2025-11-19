import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import "./assets/css/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: data.user.email })
        );
        navigate("/"); 
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Đăng nhập</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mật khẩu:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-login">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
