import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function BookRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetchRide();
  }, []);

  const fetchRide = async () => {
    try {
      const res = await axiosInstance.get(`/api/rides/${rideId}`);
      setRide(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load ride details");
    } finally {
      setLoading(false);
    }
  };

  const bookSeats = async () => {
    setBooking(true);

    const body = {
      rideId: Number(rideId),
      seats: Number(seats)
    };

    try {
      await axiosInstance.post("/api/bookings", body);
      alert("✅ Booking successful!");
      navigate("/passenger/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateFare = () => {
    if (!ride) return 0;
    // For now, just showing base fare. You can add distance calculation later
    return ride.baseFare * seats;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="pastel-card max-w-md text-center">
          <h2 className="text-xl text-red-500 mb-4">Ride not found</h2>
          <button 
            onClick={() => navigate("/passenger/search")}
            className="pastel-btn pastel-btn-primary"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="pastel-card">
          
          <div className="text-center mb-8">
            <div className="icon-circle icon-green mx-auto mb-4">
              🎫
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-2">Book Your Ride</h2>
            <p className="text-gray-600">Confirm your booking details</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Ride Details */}
            <div>
              <h3 className="text-xl font-bold mb-4">Ride Details</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Route</p>
                  <p className="text-lg font-bold">
                    {ride.source} → {ride.destination}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Departure</p>
                  <p className="font-semibold">{formatDate(ride.departureTime)}</p>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Available Seats</p>
                  <p className="text-2xl font-bold">{ride.availableSeats}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Driver Information</p>
                  <p className="font-semibold">{ride.driver?.name || "N/A"}</p>
                  <p className="text-sm text-gray-600">{ride.driver?.phone || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <h3 className="text-xl font-bold mb-4">Booking Information</h3>
              
              <div className="space-y-5">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={ride.availableSeats}
                    value={seats}
                    onChange={(e) => setSeats(Math.min(e.target.value, ride.availableSeats))}
                    className="pastel-input"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum {ride.availableSeats} seat(s) available
                  </p>
                </div>

                <div className="p-6 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Base Fare per seat:</span>
                    <span className="font-semibold">₹{ride.baseFare}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Number of seats:</span>
                    <span className="font-semibold">{seats}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Rate per KM:</span>
                    <span className="font-semibold">₹{ride.ratePerKm}</span>
                  </div>
                  <div className="border-t-2 border-yellow-200 mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Fare:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        ₹{calculateFare()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * Additional charges may apply based on actual distance
                    </p>
                  </div>
                </div>

                <button
                  onClick={bookSeats}
                  disabled={booking || ride.availableSeats === 0}
                  className="pastel-btn pastel-btn-success w-full"
                >
                  {booking ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="spinner"></div>
                      Confirming...
                    </span>
                  ) : ride.availableSeats === 0 ? "Fully Booked" : "Confirm Booking"}
                </button>

                <button
                  onClick={() => navigate("/passenger/search")}
                  className="pastel-btn pastel-btn-secondary w-full"
                >
                  Back to Search
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}