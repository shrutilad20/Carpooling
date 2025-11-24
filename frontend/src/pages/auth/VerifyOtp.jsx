import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authAPI from "../../api/auth";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Always call hooks at TOP level (Fix for your error)
  const [otp, setOtp] = useState("");

  // Full signup data passed from Signup page
  const form = location.state?.form;

  if (!form) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h2 className="text-xl text-red-500">
          Error: Signup data not found. Please go back to Signup.
        </h2>
      </div>
    );
  }

  const handleVerify = async () => {
    try {
      const payload = {
        email: form.email,
        otp: otp,
        name: form.name,
        password: form.password,
        phone: form.phone,
      };

      const res = await authAPI.verifyOtp(payload);

      alert("Signup completed!");

      // Store token if returned
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/login"); // Or dashboard
      } else {
        navigate("/login");
      }

    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] px-4">
      <div className="neu-card p-10 w-[420px]">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Verify OTP
        </h2>

        <p className="text-gray-600 mb-3">
          OTP sent to <b>{form.email}</b>
        </p>

        <input
          placeholder="Enter OTP"
          className="neu-pressed w-full p-3 mb-4"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify} className="neu-btn w-full">
          Verify OTP
        </button>
      </div>
    </div>
  );
}
