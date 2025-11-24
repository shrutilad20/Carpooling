export default function DriverDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="px-6 py-10 text-center">

      <div className="neu-card p-8 mx-auto w-[450px]">
        <h2 className="text-3xl font-bold mb-4">
          Welcome Driver, {user?.name}
        </h2>

        <div className="flex flex-col gap-4 mt-6">

          <button
            onClick={() => window.location.href = '/driver/post-ride'}
            className="neu-btn w-full"
          >
            🚗 Post a Ride
          </button>

          <button
            onClick={() => window.location.href = '/driver/my-rides'}
            className="neu-btn w-full"
          >
            📄 My Rides
          </button>

        </div>
      </div>
    </div>
  );
}
