import "../src/styles/App.css";
import React from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
// import { HumidityDisplay } from "./components/HumidityDisplay";
import { Overview } from "./routes/Overview";
import { RouterProvider, createHashRouter } from "react-router-dom";

const router = createHashRouter([

]);

export function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="body-container">
        <Sidebar />
        <div className="outlet">
          <Overview />
        </div>
      </div>
    </>
  );
}
