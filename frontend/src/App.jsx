import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";
import "./App.css";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Header */}
      <Header />

      
   <main>

       <Outlet />
   </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
