import React, { useState } from "react";
import rideAPI from "../../api/ride";

export default function PostRide() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    departureTime: "",
    totalSeats: "",
    baseFare: "",
    ratePerKm: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const driverEmail = localStorage.getItem("email"); // from login

      const response = await rideAPI.postRide(driverEmail, form);
      alert("Ride posted successfully!");

      window.location.href = "/driver/my-rides";
    } catch (err) {
      alert("Error posting ride");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Post a Ride</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        /><br />

        <input
          type="datetime-local"
          name="departureTime"
          value={form.departureTime}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="baseFare"
          placeholder="Base Fare"
          value={form.baseFare}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="ratePerKm"
          placeholder="Rate per KM"
          value={form.ratePerKm}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Post Ride</button>
      </form>
    </div>
  );
}
