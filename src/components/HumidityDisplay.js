import React, { useState } from "react";
import { useBins } from "../contexts/BinContext";
import "../styles/HumidityDisplay.css";

function HumidityDisplay() {
  const [binId, setBinId] = useState("");
  const { getBinHumidity, currentBinHumidity, isLoading, error } = useBins();

  const handleSubmit = (event) => {
    event.preventDefault();
    getBinHumidity(binId);
  };

  const formatDateAndTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const date = dateObj.toLocaleDateString(); // e.g., "11/30/2023"
    const time = dateObj.toLocaleTimeString(); // e.g., "11:35:55 AM"
    return { date, time };
  };

  return (
    <div className="humidity-display">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={binId}
          onChange={(e) => setBinId(e.target.value)}
          placeholder="Enter Bin Number"
        />
        <button type="submit">Get Humidity</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {currentBinHumidity && (
        <div>
          <p>Humidity Level: {currentBinHumidity.value}</p>
          <p>Date: {formatDateAndTime(currentBinHumidity.dateTime).date}</p>
          <p>Time: {formatDateAndTime(currentBinHumidity.dateTime).time}</p>
        </div>
      )}
    </div>
  );
}

export { HumidityDisplay };
