export default function RoleSelection() {
  return (
    <div className="flex justify-center items-center h-[75vh]">
      <div className="pastel-card w-[350px] text-center">

        <h2 className="text-xl font-bold text-[#A7C7E7] mb-6">
          Select Role
        </h2>

        <div className="flex gap-3">
          <button className="pastel-tab w-full"
            onClick={() => window.location.href="/signup?role=DRIVER"}>
            Driver
          </button>

          <button className="pastel-tab w-full"
            onClick={() => window.location.href="/signup?role=PASSENGER"}>
            Passenger
          </button>
        </div>

      </div>
    </div>
  );
}
