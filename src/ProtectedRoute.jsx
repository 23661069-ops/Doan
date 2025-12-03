import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import supabase from "./supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Không cần toast.configure() trong version >=9 của react-toastify
export default function ProtectedRoute({ children, adminOnly = false }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        toast.error("Vui lòng đăng nhập để truy cập trang này!");
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    checkUser();

    // Lắng nghe sự kiện login/logout để tự động cập nhật user
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return null; // hoặc spinner loading

  if (!user) return <Navigate to="/login" replace />;

  // Kiểm tra admin
  if (adminOnly && user.user_metadata?.role !== "admin") {
    toast.error("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  return children;
}
