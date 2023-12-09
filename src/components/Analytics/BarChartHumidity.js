import React, { useEffect, useState } from "react";

import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useBins } from "../../contexts/BinContext";

// Registering Chart.js components with ReactChartJS
Chartjs.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

// Function to format date in a specific way
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));

function BarChartHumidity() {
  // Accessing bins data from the context
  const { bins } = useBins();

  // State to track the selected bin
  const [selectedBin, setSelectedBin] = useState(
    bins.length > 0 ? bins[0].id : null
  );

  /*   console.log(bins);
  console.log(typeof bins[0].id); */

  // Handling the change in the selected bin
  const handleBinChange = (event) => {
    const selectedBinValue = event.target.value;
    // console.log(selectedBinValue);
    // Parse the selectedBinValue to an integer
    const selectedBinId =
      selectedBinValue !== "Select a Bin" && parseInt(selectedBinValue, 10);
    setSelectedBin(selectedBinId);
  };

  console.log(typeof selectedBin);

  // Set selected data to the first bin ID when the component mounts
  useEffect(() => {
    if (bins.length > 0) {
      setSelectedBin(bins[0].id);
    }
  }, [bins]);

  // Finding data for the selected bin
  const selectedBinData = selectedBin
    ? bins.find((bin) => bin.id === selectedBin)
    : null;

  console.log(selectedBinData);

  // Extracting humidity data for the selected bin
  const humidDate = selectedBinData
    ? selectedBinData.humidity.map((humid) => formatDate(humid.dateTime))
    : [];
  const humidValue = selectedBinData
    ? selectedBinData.humidity.map((humid) => humid.value)
    : [];

  // Data and styling for the Bar Chart
  const data = {
    labels: humidDate,
    datasets: [
      {
        label: "Humidity of a Bin",
        data: humidValue,
        backgroundColor: "orange",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
  };

  return (
    <div>
      <div>
        {/* Dropdown to select a bin */}
        <label>Select a Bin:</label>
        <select onChange={handleBinChange} value={selectedBin}>
          <option value={null}>Select a Bin</option>
          {bins.map((bin) => (
            <option key={bin.id} value={bin.id}>
              Bin {bin.id}
            </option>
          ))}
        </select>
      </div>

      {/* Displaying the Bar Chart if a bin is selected */}
      {selectedBin && (
        <div style={{ width: "500px", padding: "20px" }}>
          <Bar data={data} options={options}></Bar>
        </div>
      )}
    </div>
  );
}

export default BarChartHumidity;
