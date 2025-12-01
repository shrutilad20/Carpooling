import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PassengerDashboard() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Passenger
          </h1>
          <p className="text-gray-600">Welcome back, 
            {email}</p>
        </div>

        <button
          onClick={() => navigate("/passenger/search")}
          className="w-full bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-200 rounded-2xl flex items-center justify-center">
              <MapPin size={32} className="text-pink-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Search Rides</h3>
              <p className="text-gray-600">Find rides matching your route</p>
            </div>
          </div>
        </button>

      </div>
    </div>
  );
}
