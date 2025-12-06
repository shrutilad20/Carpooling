import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useRideUpdates from "../../hooks/useRideUpdates";


export default function MyRides() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchMyRides();
  }, []);

  const fetchMyRides = async () => {
    try {
      const res = await axiosInstance.get("/api/rides/my");
      setRides(res.data || []);
    } catch (err) {
      console.error("Error fetching rides:", err);
    } finally {
      setLoading(false);
    }
  };
  useRideUpdates(selectedRide, (update) => {
  // When this ride is updated (new booking / cancellation),
  // refresh bookings + ride info.
  if (update && update.id === selectedRide) {
    setRides((prev) =>
      prev.map((r) => (r.id === update.id ? { ...r, ...update } : r))
    );
    fetchBookings(update.id);
  }
});


  const fetchBookings = async (rideId) => {
    try {
      const res = await axiosInstance.get(`/api/rides/${rideId}/bookings`);
      setBookings(res.data || []);
      setSelectedRide(rideId);
    } catch (err) {
      console.error("Error fetching bookings:", err);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">My Posted Rides</h1>
            <p className="text-gray-600">Manage all your rides in one place</p>
          </div>
          <button 
            onClick={() => navigate('/driver/post-ride')}
            className="pastel-btn pastel-btn-primary"
          >
            ➕ Post New Ride
          </button>
        </div>

        {rides.length === 0 ? (
          <div className="pastel-card text-center py-12">
            <div className="icon-circle icon-purple mx-auto mb-4 text-4xl">
              🚗
            </div>
            <h3 className="text-2xl font-bold mb-3">No rides posted yet</h3>
            <p className="text-gray-600 mb-6">Start sharing your journey with passengers!</p>
            <button 
              onClick={() => navigate('/driver/post-ride')}
              className="pastel-btn pastel-btn-primary"
            >
              Post Your First Ride
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div key={ride.id} className="pastel-card">
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">
                        {ride.source} → {ride.destination}
                      </h3>
                      {ride.availableSeats > 0 ? (
                        <span className="pastel-badge badge-green">Active</span>
                      ) : (
                        <span className="pastel-badge badge-pink">Full</span>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>🕒</span>
                        <span>{formatDate(ride.departureTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>💺</span>
                        <span>{ride.availableSeats} / {ride.totalSeats} seats available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>💰</span>
                        <span>Base: ₹{ride.baseFare} | Per KM: ₹{ride.ratePerKm}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🎫</span>
                        <span>{ride.totalSeats - ride.availableSeats} bookings</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => fetchBookings(ride.id)}
                    className="pastel-btn pastel-btn-secondary"
                  >
                    View Bookings
                  </button>
                </div>

                {/* Bookings Section */}
                {selectedRide === ride.id && (
                  <div className="mt-4 pt-4 border-t-2 border-gray-200">
                    <h4 className="font-bold text-lg mb-3">Passenger Bookings:</h4>
                    {bookings.length === 0 ? (
                      <p className="text-gray-600 text-sm">No bookings yet for this ride.</p>
                    ) : (
                      <div className="space-y-2">
                        {bookings.map((booking, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                            <div>
                              <p className="font-semibold">{booking.passenger?.name || "Unknown"}</p>
                              <p className="text-sm text-gray-600">{booking.passenger?.email}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{booking.seats} seat(s)</p>
                              <p className="text-sm text-gray-600">{booking.passenger?.phone}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}