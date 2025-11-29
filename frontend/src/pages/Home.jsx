import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-6 pt-32 pb-40">
          <div className="text-center max-w-4xl mx-auto">

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight">
              <span className="gradient-text">
                Share Rides,
                <br />
                Save Money
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Connect with travelers going your way.
              <span className="font-semibold text-purple-500"> Eco-friendly</span>,
              <span className="font-semibold text-pink-500"> affordable</span>, and
              <span className="font-semibold text-blue-500"> social</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/signup')}
                className="px-10 py-5 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/login')}
                className="px-10 py-5 bg-white text-purple-500 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all border-2 border-purple-100"
              >
                Sign In
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16z M13.7 8.7a1 1 0 10-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" />
                </svg>
                <span className="font-medium">Verified Users</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0zM12.9 17c.1-.3.1-.7.1-1a7 7 0 00-1.5-4.3A5 5 0 0119 16v1h-6zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-medium">10,000+ Travelers</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2.9c.3-.9 1.6-.9 1.9 0l1 3.2c.2.3.5.6.9.6h3.4c1 0 1.4 1.3.6 1.9l-2.8 2a1 1 0 00-.3 1.1l1 3.2c.3.9-.7 1.7-1.5 1.1l-2.8-2a1 1 0 00-1.2 0l-2.8 2c-.8.6-1.8-.2-1.5-1.1l1-3.2a1 1 0 00-.4-1.1l-2.8-2c-.8-.6-.4-1.9.6-1.9H7c.4 0 .7-.3.9-.6l1-3.2z" />
                </svg>
                <span className="font-medium">4.8 Rating</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Why Choose Carpool?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the future of shared transportation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Feature card */}
            <div className="pastel-card hover-lift text-center">
              <div className="icon-circle icon-purple mx-auto mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Easy Ride Sharing</h3>
              <p className="text-gray-600">Post or find rides in seconds.</p>
            </div>

            <div className="pastel-card hover-lift text-center">
              <div className="icon-circle icon-pink mx-auto mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.4a4 4 0 11-.1 5.3M15 21H3v-1a6 6 0 0112 0v1zm6 0v-1a6 6 0 00-9-5.2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Safe Community</h3>
              <p className="text-gray-600">Verified users & OTP login.</p>
            </div>

            <div className="pastel-card hover-lift text-center">
              <div className="icon-circle icon-blue mx-auto mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.7 16.7L13.4 21a2 2 0 01-2.8 0l-4.3-4.3a8 8 0 1111.4 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Flexible Routes</h3>
              <p className="text-gray-600">Find rides that match your schedule.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Remaining sections removed for brevity */}
    </div>
  );
}

// Animations
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0% { transform: translate(0,0) scale(1); }
    33% { transform: translate(30px,-50px) scale(1.1); }
    66% { transform: translate(-20px,20px) scale(0.9); }
    100% { transform: translate(0,0) scale(1); }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
`;
document.head.appendChild(style);
