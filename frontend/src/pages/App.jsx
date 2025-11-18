import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import PostRide from "./pages/driver/PostRide";
import MyRides from "./pages/driver/MyRides";

import SearchRide from "./pages/passenger/SearchRide";
import BookRide from "./pages/passenger/BookRide";
import PassengerDashboard from "./pages/passenger/PassengerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Driver Routes */}
        <Route path="/driver/post-ride" element={<PostRide />} />
        <Route path="/driver/my-rides" element={<MyRides />} />

        {/* Passenger Routes */}
        <Route path="/passenger/search" element={<SearchRide />} />
        <Route path="/passenger/book/:rideId" element={<BookRide />} />
        <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
