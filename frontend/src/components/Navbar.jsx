import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, logout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-content">

        {/* Logo */}
        <button
          onClick={() =>
            navigate(
              user
                ? user.role === "ROLE_DRIVER"
                  ? "/driver/dashboard"
                  : "/passenger/dashboard"
                : "/"
            )
          }
          className="flex items-center gap-2"
        >
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 2L3 14h7v8l10-12h-7z" />
          </svg>
          <span className="navbar-logo">Carpool</span>
        </button>

        {/* Links */}
        <div className="navbar-links">

          {!user && (
            <>
              <button onClick={() => navigate("/")} className="text-gray-600 hover:text-purple-500">
                Home
              </button>

              <button onClick={() => navigate("/login")} className="text-gray-600 hover:text-purple-500">
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="pastel-btn pastel-btn-primary px-6 py-2"
              >
                Sign Up
              </button>
            </>
          )}

          {user && (
            <>
              <span className="text-gray-500 text-sm">{user.email}</span>

              <button
                className="pastel-btn pastel-btn-outline px-6 py-2"
                onClick={() => {
                  if (logout) logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
