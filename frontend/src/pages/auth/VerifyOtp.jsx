import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import authAPI from "../../api/auth";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { form } = location.state || {};
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      if (!form) {
        alert("Missing signup data. Please start signup again.");
        navigate("/signup");
        return;
      }

      const payload = {
        email: form.email,
        name: form.name,
        phone: form.phone,
        password: form.password,
        role: form.role,
        otp: otp,
      };

      // FIXED FUNCTION NAME
      const res = await authAPI.verifySignupOtp(payload);

      alert("Signup successful!");
      navigate("/login");
    } catch (e) {
      alert("Invalid OTP or server error: " + (e.response?.data || e.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="neu-card p-10 w-[300px]">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

        <input
          placeholder="Enter OTP"
          className="neu-pressed w-full p-3 mb-4"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="neu-btn w-full" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}
