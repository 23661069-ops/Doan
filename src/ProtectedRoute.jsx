import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "./supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProtectedRoute({ adminOnly = false }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    checkUser();

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

  if (loading) return null;

  if (!user) {
    toast.error("Vui lòng đăng nhập!");
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.user_metadata?.role !== "admin") {
    toast.error("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // ⚠️ quan trọng nhất!
}
