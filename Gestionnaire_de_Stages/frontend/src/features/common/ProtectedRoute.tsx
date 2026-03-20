import { Navigate, Outlet } from "react-router-dom";
import type { JSX } from "react";

export default function ProtectedRoute(): JSX.Element {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}