import React, { useEffect, useState } from "react";

import { Spinner } from "../utils/Spinner";
import "../../styles/overview_css/TopHumidity.css";

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

function TopHumidityBins() {
  // State to store the top bins and loading state
  const [topBins, setTopBins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch bins data when the component mounts or the token changes
  function fetchBins() {
    const token = localStorage.getItem("token");

    // If no token is available, exit early
    if (!token) {
      return;
    }

    setIsLoading(true);

    // Fetch bins data with authorization token
    fetch(`${BASE_URL}/bins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((bins) => {
        // Process the bins data to include the latest humidity and sort them
        const binsWithLatestHumidity = bins.map((bin) => ({
          ...bin,
          latestHumidity:
            bin.humidity.length > 0
              ? bin.humidity[bin.humidity.length - 1].value
              : 0,
        }));

        const sortedBins = binsWithLatestHumidity
          .sort((a, b) => b.latestHumidity - a.latestHumidity)
          .slice(0, 3);

        setTopBins(sortedBins);
      })
      .catch((error) => {
        console.error("Error fetching bins:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchBins();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Render loading spinner if data is still loading


  // Render the top humidity bins
  return (
    <div className="bin-container-top">
      {isLoading && <Spinner/>}

      {!isLoading && (
        <div>
          <h2 className="bin-heading-top">Top Humidity Control Bins</h2>
          {topBins.length > 0 ? (
            topBins.map((bin) => (
              <div key={bin.id} className="bin-item-top">
                <h3>Bin ID: {bin.id}</h3>
                <p>Latest Humidity: {bin.latestHumidity}%</p>
              </div>
            ))
          ) : (
            <p>No bins data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export { TopHumidityBins };
