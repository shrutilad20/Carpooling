import React from "react";

export default function RideCard({ ride }) {
  return (
    <div style={{
      padding: "15px",
      margin: "10px",
      border: "1px solid gray",
      borderRadius: "8px",
      width: "300px"
    }}>
      <h3>{ride.source} → {ride.destination}</h3>
      <p><b>Date:</b> {ride.departureTime}</p>
      <p><b>Seats Available:</b> {ride.availableSeats}</p>
      <p><b>Fare:</b> ₹{ride.baseFare}</p>

      <button
        onClick={() => window.location.href = `/passenger/book/${ride.id}`}
      >
        Book Now
      </button>
    </div>
  );
}
