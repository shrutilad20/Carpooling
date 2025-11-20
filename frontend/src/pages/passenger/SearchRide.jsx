import React, { useState } from "react";
import rideAPI from "../../api/ride";
import RideCard from "../../components/RideCard";

export default function SearchRide() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: ""
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const body = {
      source: form.source,
      destination: form.destination,
      from: form.date + "T00:00:00",
      to: form.date + "T23:59:00"
    };

    try {
      const res = await rideAPI.searchRides(body);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching rides");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Search Rides</h2>

      <form onSubmit={handleSearch} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="source"
          placeholder="Source"
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          onChange={handleChange}
          required
        /><br />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Search</button>
      </form>

      <hr />

      <h3>Available Rides:</h3>

      {results.length === 0 ? (
        <p>No rides found</p>
      ) : (
        results.map((r) => (
          <RideCard key={r.id} ride={r} />
        ))
      )}
    </div>
  );
}
