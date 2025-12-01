import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../../api/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("passenger");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.phone || !formData.password) {
    alert("Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      ...formData,
      role: activeRole === "driver" ? "DRIVER" : "PASSENGER", // FIXED ROLE
    };

    await authAPI.sendSignupOtp(payload);  // FIXED

    navigate("/verify-otp", { state: { form: payload } });

  } catch (err) {
    console.error("Signup OTP error:", err);
    alert("Error sending OTP. Please try again.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md fade-in">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">Create Account</h2>
          <p className="text-gray-600">Join our carpool community</p>
        </div>

        {/* ROLE TOGGLE */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveRole("passenger")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              activeRole === "passenger"
                ? "bg-gradient-to-r from-pink-400 to-pink-300 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Passenger
          </button>

          <button
            onClick={() => setActiveRole("driver")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              activeRole === "driver"
                ? "bg-gradient-to-r from-purple-400 to-purple-300 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Driver
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-purple-500 font-semibold">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
