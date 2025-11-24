import { useState } from "react";
import authAPI from "../../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await authAPI.loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] px-4">
      <div className="neu-card p-10 w-[380px]">

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          placeholder="Email"
          className="neu-pressed w-full p-3 mb-4 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="neu-pressed w-full p-3 mb-4 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="neu-btn w-full">
          Login
        </button>
      </div>
    </div>
  );
}
