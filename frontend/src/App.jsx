import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import RoleSelection from "./pages/auth/RoleSelection";

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
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* Driver routes */}
        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute role="ROLE_DRIVER">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/post-ride"
          element={
            <ProtectedRoute role="ROLE_DRIVER">
              <PostRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/my-rides"
          element={
            <ProtectedRoute role="ROLE_DRIVER">
              <MyRides />
            </ProtectedRoute>
          }
        />

        {/* Passenger routes */}
        <Route
          path="/passenger/dashboard"
          element={
            <ProtectedRoute role="ROLE_PASSENGER">
              <PassengerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/passenger/search"
          element={
            <ProtectedRoute role="ROLE_PASSENGER">
              <SearchRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/passenger/book/:rideId"
          element={
            <ProtectedRoute role="ROLE_PASSENGER">
              <BookRide />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
