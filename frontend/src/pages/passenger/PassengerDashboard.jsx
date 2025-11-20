export default function PassengerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.name}</h2>

      <button onClick={() => window.location.href='/passenger/search'}>Search Rides</button>
      <button onClick={() => window.location.href='/passenger/bookings'}>My Bookings</button>

      <p>Your recent activity will appear here.</p>
    </div>
  );
}
