// frontend/src/pages/passenger/BookRide.jsx
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { getEstimatedFare } from "../../api/fare";
import { createOrder, verifyPayment } from "../../api/payment";
import { openRazorpay } from "../../utils/razorpay";
import useRideUpdates from "../../hooks/useRideUpdates";

export default function BookRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [fareInfo, setFareInfo] = useState(null); // { distanceKm, totalFare, perSeatFare }

  const matchType = location.state?.matchType || "DIRECT";
  const pickupPoint = location.state?.pickupPoint || null;
  const dropPoint = location.state?.dropPoint || null;

  // fetch ride details
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

  // Get dynamic fare from backend
  const fetchFare = useCallback(async () => {
    if (!ride) return;
    try {
      const res = await getEstimatedFare({
        rideId: Number(rideId),
        seats: Number(seats),
        pickupPoint,
        dropPoint,
      });
      setFareInfo(res.data);
    } catch (e) {
      console.error("Fare calculation error", e);
      setFareInfo(null);
    }
  }, [ride, rideId, seats, pickupPoint, dropPoint]);

  useEffect(() => {
    fetchRide();
  }, []);

  useEffect(() => {
    fetchFare();
  }, [fetchFare]);

  // Real-time seat updates
  useRideUpdates(rideId, (update) => {
    // Expect backend to send updated ride info
    if (update && update.id === Number(rideId)) {
      setRide((prev) => ({ ...prev, ...update }));
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalFare = () => {
    if (fareInfo?.totalFare) return fareInfo.totalFare;
    if (!ride) return 0;
    // fallback: baseFare * seats
    return ride.baseFare * seats;
  };

  const handleBookingAndPayment = async () => {
    if (!ride) return;
    if (seats < 1 || seats > ride.availableSeats) {
      alert("Invalid number of seats");
      return;
    }

    setBooking(true);
    try {
      // 1. Ask backend to create payment order
      const orderRes = await createOrder({
        rideId: Number(rideId),
        seats: Number(seats),
        amount: totalFare(), // in rupees; backend should convert to paise
        matchType,
        pickupPoint,
        dropPoint,
      });

      const { key, amount, currency, orderId, customer } = orderRes.data;

      // 2. Open Razorpay checkout
      await openRazorpay(
        {
          key,
          amount, // in paise
          currency,
          name: "Carpool Ride",
          description: `Ride #${rideId}`,
          order_id: orderId,
          prefill: {
            name: customer?.name,
            email: customer?.email,
            contact: customer?.phone,
          },
          theme: {
            color: "#a855f7",
          },
        },
        async (rzpResponse) => {
          // 3. Verify payment + create booking on backend
          try {
            await verifyPayment({
              rideId: Number(rideId),
              seats: Number(seats),
              matchType,
              pickupPoint,
              dropPoint,
              razorpayOrderId: rzpResponse.razorpay_order_id,
              razorpayPaymentId: rzpResponse.razorpay_payment_id,
              razorpaySignature: rzpResponse.razorpay_signature,
            });

            alert("✅ Payment successful! Booking confirmed.");
            navigate("/passenger/dashboard");
          } catch (err) {
            console.error(err);
            alert("Payment succeeded but verification failed. Contact support.");
          } finally {
            setBooking(false);
          }
        },
        (err) => {
          console.error("Payment cancelled/failed", err);
          setBooking(false);
        }
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to start payment");
      setBooking(false);
    }
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
          {/* Header */}
          <div className="text-center mb-8">
            <div className="icon-circle icon-green mx-auto mb-4">🎫</div>
            <h2 className="text-3xl font-bold gradient-text mb-2">
              Book Your Ride
            </h2>
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
                  {matchType === "PARTIAL" && (
                    <p className="text-xs text-gray-600 mt-1">
                      You will join from <b>{pickupPoint}</b> and leave at{" "}
                      <b>{dropPoint}</b>.
                    </p>
                  )}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Departure</p>
                  <p className="font-semibold">
                    {formatDate(ride.departureTime)}
                  </p>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Available Seats</p>
                  <p className="text-2xl font-bold">{ride.availableSeats}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Driver</p>
                  <p className="font-semibold">{ride.driver?.name || "N/A"}</p>
                  <p className="text-sm text-gray-600">
                    {ride.driver?.phone || "N/A"}
                  </p>
                </div>

                {fareInfo?.distanceKm && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Distance</p>
                    <p className="font-semibold">
                      {fareInfo.distanceKm.toFixed(1)} km
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form + Fare */}
            <div>
              <h3 className="text-xl font-bold mb-4">Booking & Fare</h3>

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
                    onChange={(e) =>
                      setSeats(
                        Math.min(
                          Math.max(1, Number(e.target.value || 1)),
                          ride.availableSeats
                        )
                      )
                    }
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
                    <span className="text-gray-600">Rate per KM:</span>
                    <span className="font-semibold">₹{ride.ratePerKm}</span>
                  </div>
                  {fareInfo?.perSeatFare && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">
                        Dynamic Fare per seat:
                      </span>
                      <span className="font-semibold">
                        ₹{fareInfo.perSeatFare}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Number of seats:</span>
                    <span className="font-semibold">{seats}</span>
                  </div>
                  <div className="border-top-2 border-yellow-200 mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Fare:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        ₹{totalFare()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * Final fare based on actual travelled distance as
                      computed by the system.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleBookingAndPayment}
                  disabled={booking || ride.availableSeats === 0}
                  className="pastel-btn pastel-btn-success w-full"
                >
                  {booking
                    ? "Processing payment..."
                    : ride.availableSeats === 0
                    ? "Fully Booked"
                    : "Pay & Confirm Booking"}
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
