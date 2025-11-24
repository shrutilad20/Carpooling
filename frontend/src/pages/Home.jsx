export default function Home() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">

      <div className="neu-card p-10 w-[420px]">
        <h1 className="text-3xl font-bold mb-2">Carpooling App</h1>
        <p className="text-gray-600 mb-6">Find or offer rides easily.</p>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.href='/login'} 
            className="neu-btn">
            Login
          </button>

          <button 
            onClick={() => window.location.href='/signup'} 
            className="neu-btn">
            Signup
          </button>
        </div>
      </div>

    </div>
  );
}
