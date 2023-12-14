import React, { useEffect, useState } from "react";
import { useBins } from "../../contexts/BinContext";
import "../../styles/overview_css/HumidityDisplay.css";
import { Spinner } from "../utils/Spinner";

// Component for displaying humidity information for a specific bin
function HumidityDisplay() {
  const [binId, setBinId] = useState("");
  const [error, setError] = useState();
  const { getBinHumidity, currentBinHumidity, isLoading, errorMsg } = useBins();

  const handleSubmit = (event) => {
    event.preventDefault();
    getBinHumidity(binId);
  };

  const formatDateAndTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  useEffect(() => {
    setError(errorMsg ? "Error Fetching Bin" : null);
  }, [errorMsg]);

  console.log("Error: " + error);

  return (
    <div className="humidity-display">
      {isLoading && <Spinner />}

      {/* Form to input bin ID and get humidity information */}
      {!isLoading && (
        <div>
          <form onSubmit={handleSubmit} className="humidity-submit-form">
            <input
              type="text"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              placeholder="Enter Bin Number"
              className="humidity-input-form"
            />
            <button className="humidity-submit-button" type="submit">
              Submit
            </button>
          </form>

          {error && <p className="error-label-humidity-label">{error}</p>}

          {!isLoading && !error && currentBinHumidity && (
            <div className="humidity-bin-text">
              {!error && (
                <div>
                  <p>Humidity Level: {currentBinHumidity.value}</p>
                  <p>
                    Date: {formatDateAndTime(currentBinHumidity.dateTime).date}
                  </p>
                  <p>
                    Time: {formatDateAndTime(currentBinHumidity.dateTime).time}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { HumidityDisplay };
