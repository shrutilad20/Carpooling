import React from "react";
import { Car, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 
                         bg-clip-text text-transparent mb-2">
            Driver Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {email}</p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Post a Ride */}
          <button
            onClick={() => navigate("/driver/post-ride")}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all 
                       transform hover:-translate-y-2 text-left"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-200 
                            rounded-2xl flex items-center justify-center mb-4">
              <Car size={32} className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Post a Ride</h3>
            <p className="text-gray-600">Share your journey with passengers</p>
          </button>

          {/* My Rides */}
          <button
            onClick={() => navigate("/driver/my-rides")}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all 
                       transform hover:-translate-y-2 text-left"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-200 
                            rounded-2xl flex items-center justify-center mb-4">
              <Calendar size={32} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">My Rides</h3>
            <p className="text-gray-600">View and manage your posted rides</p>
          </button>

        </div>
      </div>
    </div>
  );
}
