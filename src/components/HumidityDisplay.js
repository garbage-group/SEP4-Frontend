import React, { useState } from "react";
import "../styles/HumidityDisplay.css";

function HumidityDisplay() {
  const [binId, setBinId] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(false); // added loading state
  const [error, setError] = useState(""); // added error state

  const fetchHumidity = async () => {
    setLoading(true); // start loading
    setError(""); // reset error state
    try {
      const response = await fetch(
        `http://localhost:8080/bins/${binId}/humidity`
      ); // URL provided by the Cloud team

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const humidityValue = await response.json();
      setHumidity(humidityValue);
    } catch (err) {
      setError(err.message); // set error message
      setHumidity(null); // reset humidity
    } finally {
      setLoading(false); // end loading regardless of result
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchHumidity();
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
      {loading && <p>Loading...</p>} {/* Show loading text */}
      {error && <p>{error}</p>} {/* Display error message */}
      {humidity !== null && (
        <div>
          <p>Humidity Level: {humidity.value}</p>
        </div>
      )}
    </div>
  );
}

export { HumidityDisplay };
