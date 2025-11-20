import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import DriverDashboard from "./pages/driver/DriverDashboard";
import PostRide from "./pages/driver/PostRide";
import MyRides from "./pages/driver/MyRides";

import PassengerDashboard from "./pages/passenger/PassengerDashboard";
import SearchRide from "./pages/passenger/SearchRide";
import BookRide from "./pages/passenger/BookRide";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver/post-ride" element={<ProtectedRoute><PostRide /></ProtectedRoute>} />
        <Route path="/passenger/search" element={<ProtectedRoute><SearchRide /></ProtectedRoute>} />
        <Route path="/passenger/book/:rideId" element={<ProtectedRoute><BookRide /></ProtectedRoute>} />

        {/* Driver routes */}
        <Route
          path="/driver/dashboard"
          element={<ProtectedRoute role="DRIVER"><DriverDashboard /></ProtectedRoute>}
        />
        <Route
          path="/driver/post-ride"
          element={<ProtectedRoute role="DRIVER"><PostRide /></ProtectedRoute>}
        />
        <Route
          path="/driver/my-rides"
          element={<ProtectedRoute role="DRIVER"><MyRides /></ProtectedRoute>}
        />

        {/* Passenger routes */}
        <Route
          path="/passenger/dashboard"
          element={<ProtectedRoute role="PASSENGER"><PassengerDashboard /></ProtectedRoute>}
        />
        <Route
          path="/passenger/search"
          element={<ProtectedRoute role="PASSENGER"><SearchRide /></ProtectedRoute>}
        />
        <Route
          path="/passenger/book"
          element={<ProtectedRoute role="PASSENGER"><BookRide /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
