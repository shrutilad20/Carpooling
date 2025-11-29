import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function PassengerDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Passenger";
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await axiosInstance.get("/api/bookings/my");
      setBookings(res.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Welcome Section */}
        <div className="pastel-card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Welcome, {userName}! 🎒
              </h1>
              <p className="text-gray-600">
                Find your next journey and book rides easily
              </p>
            </div>
            <div className="icon-circle icon-pink text-4xl">
              🚗
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="pastel-card mb-8 cursor-pointer hover:shadow-xl transition-all"
             onClick={() => navigate('/passenger/search')}>
          <div className="flex items-center gap-4">
            <div className="icon-circle icon-purple text-4xl">
              🔍
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1">Search Available Rides</h3>
              <p className="text-gray-600">Find rides matching your route and schedule</p>
            </div>
            <button className="pastel-btn pastel-btn-primary">
              Search Now
            </button>
          </div>
        </div>

        {/* My Bookings Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
          
          {loading ? (
            <div className="pastel-card text-center py-12">
              <div className="spinner mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="pastel-card text-center py-12">
              <div className="icon-circle icon-pink mx-auto mb-4 text-4xl">
                📋
              </div>
              <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start exploring available rides!</p>
              <button 
                onClick={() => navigate('/passenger/search')}
                className="pastel-btn pastel-btn-primary"
              >
                Search Rides
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="pastel-card">
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold">
                          {booking.ride?.source} → {booking.ride?.destination}
                        </h3>
                        <span className="pastel-badge badge-green">Confirmed</span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>🕒</span>
                          <span>{formatDate(booking.ride?.departureTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>💺</span>
                          <span>{booking.seats} seat(s) booked</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>💰</span>
                          <span>₹{booking.ride?.baseFare}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t-2 border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Driver:</span> {booking.ride?.driver?.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Contact:</span> {booking.ride?.driver?.phone || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}