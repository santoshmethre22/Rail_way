import React from "react";

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md w-full">
      {/* Wrapper only for content alignment */}
      <div className="px-6 flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold">🚆 Train Booking</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-gray-200 transition">
            Home
          </a>
          <a href="/trains" className="hover:text-gray-200 transition">
            Trains
          </a>
          <a href="/about" className="hover:text-gray-200 transition">
            About
          </a>
          <a href="/contact" className="hover:text-gray-200 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
