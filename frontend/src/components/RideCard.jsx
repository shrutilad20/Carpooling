export default function RideCard({ ride }) {
  return (
    <div className="neu-card p-5 w-[380px] mx-auto mb-4 cursor-pointer"
         onClick={() => window.location.href = `/passenger/book/${ride.id}`}>
      <h3 className="text-xl font-bold">{ride.source} → {ride.destination}</h3>
      <p className="text-gray-600">🕒 {ride.departureTime}</p>
      <p className="text-gray-600">💺 Seats: {ride.availableSeats}</p>
      <p className="mt-2 font-semibold">₹ {ride.baseFare}</p>
    </div>
  );
}
