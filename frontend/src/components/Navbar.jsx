import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="neu-card px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <h2 className="text-xl font-bold">🚗 Carpooling</h2>

      <div className="flex gap-6 text-md">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/login" className="hover:text-blue-600">Login</Link>
        <Link to="/signup" className="hover:text-blue-600">Signup</Link>
      </div>
    </div>
  );
}
