export default function PassengerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="px-6 py-10 text-center">

      <div className="neu-card p-8 mx-auto w-[450px]">
        <h2 className="text-3xl font-bold mb-4">
          Welcome, {user?.name}
        </h2>

        <button
          onClick={() => window.location.href='/passenger/search'}
          className="neu-btn w-full mt-6"
        >
          🔍 Search Rides
        </button>
      </div>

    </div>
  );
}
