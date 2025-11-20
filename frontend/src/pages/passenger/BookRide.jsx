import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rideAPI from "../../api/ride";
import bookingAPI from "../../api/booking";

export default function BookRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);

  const passengerEmail = localStorage.getItem("email");  // saved login email

  useEffect(() => {
    fetchRide();
  }, []);

  const fetchRide = async () => {
    try {
      const res = await rideAPI.getRideById(rideId);
      setRide(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load ride details");
    }
  };

  const bookSeats = async () => {
    if (!passengerEmail) {
      alert("Login required");
      return;
    }

    const body = {
      rideId: Number(rideId),
      seats: Number(seats)
    };

    try {
      await bookingAPI.bookRide(passengerEmail, body);
      alert("Booking successful!");
      navigate("/passenger/dashboard");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  if (!ride) return <p>Loading ride...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Book Ride</h2>

      <div style={{
        padding: "20px",
        border: "1px solid gray",
        width: "350px",
        borderRadius: "10px"
      }}>
        <h3>{ride.source} → {ride.destination}</h3>
        <p><b>Date:</b> {ride.departureTime}</p>
        <p><b>Fare:</b> ₹{ride.baseFare}</p>
        <p><b>Available Seats:</b> {ride.availableSeats}</p>

        <label>Seats to book:</label><br />
        <input
          type="number"
          min="1"
          max={ride.availableSeats}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        /><br /><br />

        <button onClick={bookSeats}>Book Now</button>
      </div>
    </div>
  );
}
