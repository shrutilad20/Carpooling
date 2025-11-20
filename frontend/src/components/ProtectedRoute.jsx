import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // save this at login

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Role mismatch
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
