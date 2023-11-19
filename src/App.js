import "../src/styles/App.css";
import React from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { HumidityDisplay } from "./components/HumidityDisplay";

export function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="body-container">
        <Sidebar />
        <div className="outlet">
          <HumidityDisplay />
        </div>
      </div>
    </>
  );
}
