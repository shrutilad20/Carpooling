import { useState } from "react";
import authAPI from "../../api/auth";   // FIXED import

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
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
