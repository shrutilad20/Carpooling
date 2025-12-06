// frontend/src/pages/passenger/SearchRide.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { matchRoutes } from "../../api/fare";

function SearchRide() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!source || !destination || !date) {
      alert("Please enter source, destination and date");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // BASIC direct search (existing endpoint)
      const res = await axiosInstance.post(
        "/api/rides/search",
        {
          source,
          destination,
          from: date + "T00:00:00",
          to: date + "T23:59:59",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let directRides = res.data || [];

      // ADVANCED route matching (direct + partial)
      // backend should mark: matchType = 'DIRECT' | 'PARTIAL'
      // and return distanceKm, estimatedFare, pickupPoint, dropPoint
      const routeMatchRes = await matchRoutes({
        source,
        destination,
        from: date + "T00:00:00",
        to: date + "T23:59:59",
      });

      const matched = routeMatchRes.data || [];

      // combine / de-duplicate by ride.id if needed
      const all = [...directRides, ...matched];
      const unique = [];
      const seen = new Set();
      for (const r of all) {
        if (!seen.has(r.id)) {
          seen.add(r.id);
          unique.push(r);
        }
      }

      setRides(unique);
    } catch (err) {
      console.error(err);
      alert("Error fetching rides");
    } finally {
      setLoading(false);
    }
  };

  const formatMatchLabel = (ride) => {
    if (ride.matchType === "PARTIAL") {
      return `Partial match via ${ride.pickupPoint || "route"}`;
    }
    return "Direct match";
  };

  return (
    <div className="min-h-screen p-8 bg-purple-50">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        Find a Ride
      </h1>

      {/* SEARCH FORM */}
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

        <button
          className="pastel-btn pastel-btn-primary w-full"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Ride"}
        </button>
      </div>

      {/* RESULTS */}
      <div className="mt-10 max-w-3xl mx-auto space-y-4">
        {rides.length === 0 ? (
          <p className="text-gray-500 text-center">
            {loading ? "" : "No rides found"}
          </p>
        ) : (
          rides.map((ride) => (
            <div key={ride.id} className="pastel-card hover-lift">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {ride.source} → {ride.destination}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Departure: {ride.departureTime.replace("T", " @ ")}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    Seats Available: {ride.availableSeats}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    Base Fare: ₹{ride.baseFare} &nbsp; | &nbsp;
                    Rate: ₹{ride.ratePerKm}/km
                  </p>

                  {ride.distanceKm && (
                    <p className="text-gray-600 text-sm mt-1">
                      Distance: {ride.distanceKm.toFixed(1)} km
                    </p>
                  )}

                  {ride.estimatedFare && (
                    <p className="font-semibold mt-1">
                      Estimated Fare (1 seat): ₹{ride.estimatedFare}
                    </p>
                  )}

                  <span className="pastel-badge badge-purple mt-2 inline-block">
                    {formatMatchLabel(ride)}
                  </span>

                  {ride.matchType === "PARTIAL" && (
                    <p className="text-xs text-gray-500 mt-1">
                      Pickup: {ride.pickupPoint} &nbsp; | &nbsp;
                      Drop: {ride.dropPoint}
                    </p>
                  )}
                </div>

                <button
                  className="pastel-btn pastel-btn-secondary"
                  onClick={() =>
                    navigate(`/passenger/book/${ride.id}`, {
                      state: {
                        matchType: ride.matchType,
                        pickupPoint: ride.pickupPoint,
                        dropPoint: ride.dropPoint,
                      },
                    })
                  }
                >
                  Book Ride
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchRide;
