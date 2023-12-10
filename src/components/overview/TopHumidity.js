import React, { useEffect, useState } from 'react';
import '../../styles/overview_css/News.css'; // Make sure this path is correct

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

function TopHumidityBins() {
  const [topBins, setTopBins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBins() {
      if (!token) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/bins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const bins = await response.json();

        // Get the latest humidity value for each bin
        const binsWithLatestHumidity = bins.map(bin => ({
          ...bin,
          latestHumidity: bin.humidity.length > 0 ? bin.humidity[bin.humidity.length - 1].value : 0
        }));

        // Sort bins by their latest humidity and take the top 3
        const sortedBins = binsWithLatestHumidity.sort((a, b) => b.latestHumidity - a.latestHumidity).slice(0, 3);

        setTopBins(sortedBins);
      } catch (error) {
        console.error('Error fetching bins:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBins();
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bin-container-top'>
      <h2 className='bin-heading-top'>Top Humidity Control Bins</h2> {/* Add this line for the heading */}
      {topBins.length > 0 ? ( // Check if there are bins to display
        topBins.map(bin => (
          <div key={bin.id} className='bin-item-top'>
            <h3>Bin ID: {bin.id}</h3>
            <p>Latest Humidity: {bin.latestHumidity}%</p>
          </div>
        ))
      ) : (
        <p>No bins data available.</p> // Display this if no bins data is fetched
      )}
    </div>
  );
}

export { TopHumidityBins };