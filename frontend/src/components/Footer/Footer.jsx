import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10 w-full">
      {/* Wrapper for centered content */}
      <div className="px-6 text-center max-w-screen-xl mx-auto">
        <p>© {new Date().getFullYear()} Train Booking. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Made with ❤️ by <span className="text-blue-400">Santosh</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
