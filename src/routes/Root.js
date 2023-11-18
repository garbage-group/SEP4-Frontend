import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/App.css";

export function Root() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="body-container">
        <Sidebar />
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
}
