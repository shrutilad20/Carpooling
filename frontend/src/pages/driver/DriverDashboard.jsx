export default function DriverDashboard() {
  return (
    <div className="mt-10 text-center">
      <div className="pastel-card w-[450px] mx-auto">

        <h2 className="text-3xl font-bold text-[#7aa4ff] mb-4">
          Driver Dashboard
        </h2>

        <a href="/driver/post-ride" className="pastel-btn mb-4">Post a Ride</a>
        <a href="/driver/my-rides" className="pastel-btn">My Rides</a>

      </div>
    </div>
  );
}
