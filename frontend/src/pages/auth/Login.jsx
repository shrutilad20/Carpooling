import React, { useState, useEffect } from 'react';
import { Home, Users, Car, MapPin, Calendar, ArrowRight, Check, User, Phone, Mail, Lock, Shield } from 'lucide-react';

// Mock auth state
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    if (token && email) {
      setUser({ email, role });
    }
    setLoading(false);
  }, []);

  const login = (email, role) => {
    localStorage.setItem('token', 'mock_token');
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    setUser({ email, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setUser(null);
  };

  return { user, loading, login, logout };
};

// Landing Page Component
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Share Rides, Save Money
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with travelers going your way. Eco-friendly, affordable, and social.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Get Started <ArrowRight className="inline ml-2" size={20} />
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="px-8 py-4 bg-white text-purple-500 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
              <Car size={32} className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Easy Ride Sharing</h3>
            <p className="text-gray-600">Post or find rides in seconds. Connect with verified travelers instantly.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-200 rounded-2xl flex items-center justify-center mb-6">
              <Users size={32} className="text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Safe Community</h3>
            <p className="text-gray-600">OTP verification and user ratings ensure a trusted travel experience.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
              <MapPin size={32} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Flexible Routes</h3>
            <p className="text-gray-600">Search by location and time. Find the perfect ride for your journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Signup Page
const SignupPage = ({ onNavigate, onLogin }) => {
  const [activeRole, setActiveRole] = useState('passenger');
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.password) {
      setStep('otp');
      alert('OTP sent to your email!');
    }
  };

  const handleVerifyOtp = () => {
    if (otp) {
      onLogin(formData.email, activeRole === 'driver' ? 'ROLE_DRIVER' : 'ROLE_PASSENGER');
      alert('Signup successful!');
      onNavigate(activeRole === 'driver' ? 'driver-dashboard' : 'passenger-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {step === 'form' ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">Join our carpool community</p>
            </div>

            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveRole('passenger')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  activeRole === 'passenger'
                    ? 'bg-gradient-to-r from-pink-400 to-pink-300 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Users className="inline mr-2" size={20} />
                Passenger
              </button>
              <button
                onClick={() => setActiveRole('driver')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  activeRole === 'driver'
                    ? 'bg-gradient-to-r from-purple-400 to-purple-300 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Car className="inline mr-2" size={20} />
                Driver
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-300 focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-300 focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-300 focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-300 focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Send OTP
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <button onClick={() => onNavigate('login')} className="text-purple-500 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Verify OTP
              </h2>
              <p className="text-gray-600">Enter the code sent to {formData.email}</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-center text-2xl tracking-widest focus:border-purple-300 focus:outline-none transition-colors"
                maxLength={6}
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Verify & Continue
              </button>

              <button
                onClick={() => setStep('form')}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Login Page
const LoginPage = ({ onNavigate, onLogin }) => {
  const [activeRole, setActiveRole] = useState('passenger');
  const [useOtp, setUseOtp] = useState(false);
  const [step, setStep] = useState('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    if (email) {
      if (useOtp) {
        setStep('otp');
        alert('OTP sent to your email!');
      } else if (password) {
        onLogin(email, activeRole === 'driver' ? 'ROLE_DRIVER' : 'ROLE_PASSENGER');
        onNavigate(activeRole === 'driver' ? 'driver-dashboard' : 'passenger-dashboard');
      }
    }
  };

  const handleVerifyOtp = () => {
    if (otp) {
      onLogin(email, activeRole === 'driver' ? 'ROLE_DRIVER' : 'ROLE_PASSENGER');
      onNavigate(activeRole === 'driver' ? 'driver-dashboard' : 'passenger-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {step === 'form' ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </div>

            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveRole('passenger')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  activeRole === 'passenger'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Users className="inline mr-2" size={20} />
                Passenger
              </button>
              <button
                onClick={() => setActiveRole('driver')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  activeRole === 'driver'
                    ? 'bg-gradient-to-r from-purple-400 to-purple-300 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Car className="inline mr-2" size={20} />
                Driver
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-300 focus:outline-none transition-colors"
                />
              </div>

              {!useOtp && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-300 focus:outline-none transition-colors"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useOtp"
                  checked={useOtp}
                  onChange={(e) => setUseOtp(e.target.checked)}
                  className="w-4 h-4 accent-blue-400"
                />
                <label htmlFor="useOtp" className="text-sm text-gray-600 cursor-pointer">
                  Login with OTP instead
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                {useOtp ? 'Send OTP' : 'Sign In'}
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <button onClick={() => onNavigate('signup')} className="text-blue-500 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Verify OTP
              </h2>
              <p className="text-gray-600">Enter the code sent to {email}</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-center text-2xl tracking-widest focus:border-blue-300 focus:outline-none transition-colors"
                maxLength={6}
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Verify & Continue
              </button>

              <button
                onClick={() => setStep('form')}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Dashboard Pages
const DriverDashboard = ({ onNavigate, user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Driver Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('post-ride')}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-200 rounded-2xl flex items-center justify-center mb-4">
              <Car size={32} className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Post a Ride</h3>
            <p className="text-gray-600">Share your journey with passengers</p>
          </button>

          <button
            onClick={() => onNavigate('my-rides')}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-200 rounded-2xl flex items-center justify-center mb-4">
              <Calendar size={32} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">My Rides</h3>
            <p className="text-gray-600">View and manage your posted rides</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const PassengerDashboard = ({ onNavigate, user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Passenger Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>

        <button
          onClick={() => onNavigate('search-ride')}
          className="w-full bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-200 rounded-2xl flex items-center justify-center">
              <MapPin size={32} className="text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Search Rides</h3>
              <p className="text-gray-600">Find rides matching your route</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const { user, loading, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    if (user && currentPage === 'landing') {
      setCurrentPage(user.role === 'ROLE_DRIVER' ? 'driver-dashboard' : 'passenger-dashboard');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const Navbar = () => (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage(user ? (user.role === 'ROLE_DRIVER' ? 'driver-dashboard' : 'passenger-dashboard') : 'landing')}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Carpool
        </button>
        
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-gray-600 text-sm">{user.email}</span>
              <button 
                onClick={() => {
                  logout();
                  setCurrentPage('landing');
                }}
                className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setCurrentPage('landing')}
                className="text-purple-500 font-semibold hover:underline"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('login')}
                className="text-pink-500 font-semibold hover:underline"
              >
                Login
              </button>
              <button 
                onClick={() => setCurrentPage('signup')}
                className="px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === 'signup' && <SignupPage onNavigate={setCurrentPage} onLogin={login} />}
      {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} onLogin={login} />}
      {currentPage === 'driver-dashboard' && user && <DriverDashboard onNavigate={setCurrentPage} user={user} />}
      {currentPage === 'passenger-dashboard' && user && <PassengerDashboard onNavigate={setCurrentPage} user={user} />}
    </div>
  );
}