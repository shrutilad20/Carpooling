export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Carpooling App</h1>
      <p>Find or offer rides easily.</p>

      <button onClick={() => window.location.href='/login'}>Login</button>
      <button onClick={() => window.location.href='/signup'} style={{ marginLeft: "10px" }}>
        Signup
      </button>
    </div>
  );
}
