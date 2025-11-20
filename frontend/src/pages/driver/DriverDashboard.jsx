export default function DriverDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome Driver, {user?.name}</h2>

      <button onClick={() => window.location.href='/driver/post-ride'}>Post Ride</button>
      <button onClick={() => window.location.href='/driver/my-rides'}>My Rides</button>

      <p>Your recently posted rides will appear here.</p>
    </div>
  );
}
