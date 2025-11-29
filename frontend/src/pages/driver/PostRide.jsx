import { useState } from "react";
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
      await rideAPI.postRide(form);
      alert("Ride Posted Successfully!");
      window.location.href = "/driver/my-rides";
    } catch (error) {
      console.error(error);
      alert("Error posting ride");
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="neu-card p-10 w-[450px]">

        <h2 className="text-3xl font-bold mb-6 text-center">Post a Ride</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input className="neu-pressed p-3" placeholder="Source" name="source" onChange={handleChange} />
          <input className="neu-pressed p-3" placeholder="Destination" name="destination" onChange={handleChange} />
          <input className="neu-pressed p-3" type="datetime-local" name="departureTime" onChange={handleChange} />
          <input className="neu-pressed p-3" placeholder="Total Seats" name="totalSeats" onChange={handleChange} />
          <input className="neu-pressed p-3" placeholder="Base Fare" name="baseFare" onChange={handleChange} />
          <input className="neu-pressed p-3" placeholder="Rate per KM" name="ratePerKm" onChange={handleChange} />

          <button className="neu-btn w-full mt-3">Submit</button>
        </form>

      </div>
    </div>
  );
}
