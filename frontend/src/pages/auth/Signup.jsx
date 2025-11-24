import { useState } from "react";
import { sendSignupOtp } from "../../api/auth"; 
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "PASSENGER",
  });

  const handleSignup = async () => {
    try {
      // Call backend to generate OTP
      await sendSignupOtp(form);

      alert("OTP sent to your email!");
      
      // Move to OTP verification page with full signup form
      navigate("/verify-otp", { state: { form } });

    } catch (err) {
      alert("Error: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] px-4">
      <div className="neu-card p-10 w-[420px]">

        <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>

        <input
          placeholder="Name"
          className="neu-pressed w-full p-3 mb-4"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="neu-pressed w-full p-3 mb-4"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="neu-pressed w-full p-3 mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="neu-pressed w-full p-3 mb-4"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <select
          className="neu-pressed w-full p-3 mb-4"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="PASSENGER">Passenger</option>
          <option value="DRIVER">Driver</option>
        </select>

        <button onClick={handleSignup} className="neu-btn w-full">
          Signup
        </button>
      </div>
    </div>
  );
}
