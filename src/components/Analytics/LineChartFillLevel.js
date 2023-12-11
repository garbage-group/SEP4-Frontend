import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale, // x-axis
  LinearScale, // y-axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { useBins } from "../../contexts/BinContext";
import { Dropdown } from "../utils/Dropdown";

// Registering Chart.js elements and plugins
Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

// Function to format date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// Main LineChartFillLevel component
function LineChartFillLevel() {
  // Fetching bins data using context
  const { bins } = useBins();

  // State to manage the selected bin
  const [selectedBin, setSelectedBin] = useState(
    bins.length > 0 ? bins[0].id : null
  );

  // Set selected data to the first bin ID when the component mounts
  useEffect(() => {
    if (bins.length > 0) {
      setSelectedBin(bins[0].id);
    }
  }, [bins]);

  // Handling change in the selected bin
  function handleBinChange(event) {
    const selectedBin = event.target.value;
    const selectedBinId =
      selectedBin !== "Select a Bin" && parseInt(selectedBin, 10);
    setSelectedBin(selectedBinId);
  }

  // Extracting data for the selected bin
  const selectedBinData = selectedBin
    ? bins.find((bin) => bin.id === selectedBin)
    : null;

  // Calculating daily averages for fill levels
  const dailyAverages = selectedBinData
    ? calculateDailyAverage(selectedBinData.fillLevels)
    : {};

  // Sorting and formatting dates for the chart
  const sortedDates = Object.keys(dailyAverages)
    .map((date) => new Date(date))
    .sort((a, b) => a - b)
    .map((date) => formatDate(date));

  const averageFillLevelDate = sortedDates;
  const averageFillLevelValue = sortedDates.map((date) => dailyAverages[date]);

  // Chart data and options
  const data = {
    labels: averageFillLevelDate,
    datasets: [
      {
        label: "Average Fill Level Of Bin By Date",
        data: averageFillLevelValue,
        backgroundColor: "aqua",
        borderColor: "black",
        pointBorderColour: "aqua",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },

    scales: {},
  };

  // Rendering the component
  return (
    <>
      {/* Dropdown for selecting bins */}
      <Dropdown
        bins={bins}
        selectedBin={selectedBin}
        handleBinChange={handleBinChange}
      />

      {/* Render chart if a bin is selected */}
      {selectedBin && (
        <div style={{}}>
          <Line data={data} options={options}></Line>
        </div>
      )}
    </>
  );
}

// Function to calculate daily averages
function calculateDailyAverage(fillLevels) {
  const dailyData = {};

  fillLevels.forEach((temp) => {
    const date = formatDate(temp.dateTime);

    if (!dailyData[date]) {
      dailyData[date] = {
        total: 0,
        count: 0,
      };
    }

    dailyData[date].total += temp.value;
    dailyData[date].count += 1;
  });

  const dailyAverages = {};

  for (const date in dailyData) {
    const average = dailyData[date].total / dailyData[date].count;
    dailyAverages[date] = average;
  }

  return dailyAverages;
}

export { LineChartFillLevel };
