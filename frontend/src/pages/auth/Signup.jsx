import { useState } from "react";
import { registerUser } from "../../api/auth";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "PASSENGER",
  });

  const handleSignup = async () => {
    try {
      const res = await registerUser(form);
      alert("Signup successful!");
    } catch (e) {
      alert("Email already in use");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} /><br/>
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} /><br/>
      <input placeholder="Password" type="password" onChange={(e) => setForm({...form, password: e.target.value})} /><br/>
      <input placeholder="Phone" onChange={(e) => setForm({...form, phone: e.target.value})} /><br/>

      <select onChange={(e) => setForm({...form, role: e.target.value})}>
        <option value="PASSENGER">Passenger</option>
        <option value="DRIVER">Driver</option>
      </select><br/>

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
