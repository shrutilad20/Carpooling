import { useState } from "react";
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
      to: form.date + "T23:59:00",
    };

    try {
      const res = await rideAPI.searchRides(body);
      setResults(res.data);
    } catch {
      alert("Error getting rides");
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="neu-card p-8 mx-auto w-[420px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Search Rides</h2>

        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input className="neu-pressed p-3" placeholder="Source" name="source" onChange={handleChange} />
          <input className="neu-pressed p-3" placeholder="Destination" name="destination" onChange={handleChange} />
          <input className="neu-pressed p-3" type="date" name="date" onChange={handleChange} />
          <button className="neu-btn w-full">Search</button>
        </form>
      </div>

      <h3 className="mt-10 text-xl font-semibold text-center">Available Rides</h3>

      <div className="mt-4 flex flex-col items-center">
        {results.length === 0 ? <p>No rides found</p> :
          results.map((r) => <RideCard key={r.id} ride={r} />)
        }
      </div>
    </div>
  );
}
