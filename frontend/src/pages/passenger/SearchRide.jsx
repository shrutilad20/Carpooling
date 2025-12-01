import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchRide() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/rides/search",
        {
          source,
          destination,
          from: date + "T00:00:00",
          to: date + "T23:59:59",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRides(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching rides");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-purple-50">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        Find a Ride
      </h1>

      <div className="pastel-card max-w-2xl mx-auto space-y-4">
        <input
          className="pastel-input"
          type="text"
          placeholder="Enter Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          className="pastel-input"
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          className="pastel-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="pastel-btn pastel-btn-primary w-full" onClick={handleSearch}>
          Search Ride
        </button>
      </div>

      {/* Results */}
      <div className="mt-10 max-w-3xl mx-auto space-y-4">
        {rides.length === 0 ? (
          <p className="text-gray-500 text-center">No rides found</p>
        ) : (
          rides.map((ride) => (
            <div key={ride.id} className="pastel-card hover-lift">
              <h3 className="text-xl font-semibold">
                {ride.source} → {ride.destination}
              </h3>

              <p className="text-gray-600">
                Departure: {ride.departureTime.replace("T", " @ ")}
              </p>

              <p className="text-gray-600">
                Seats Available: {ride.availableSeats}
              </p>

              <p className="text-gray-600">
                Fare: ₹{ride.baseFare} + {ride.ratePerKm} /km
              </p>

              <button
                className="pastel-btn pastel-btn-secondary mt-3"
                onClick={() => navigate(`/passenger/book/${ride.id}`)}
              >
                Book Ride
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchRide;
