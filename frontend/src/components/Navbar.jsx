import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav style={{
      padding: "10px",
      background: "#222",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "20px" }}>Carpooling</Link>
      </div>

      <div>
        {!token ? (
          <>
            <Link to="/login" style={{ color: "white", marginRight: "10px" }}>Login</Link>
            <Link to="/signup" style={{ color: "white" }}>Signup</Link>
          </>
        ) : (
          <button onClick={logout} style={{ background: "red", color: "white" }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
