import "../src/styles/App.css";
import React from "react";
import { Overview } from "./components/Overview";

export function App() {
  return (
    <>
      <div>
      </div>
      <div className="body-container">
        <div className="outlet">
          <Overview />
        </div>
      </div>
    </>
  );
}
