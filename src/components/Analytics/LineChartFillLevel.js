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

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function LineChartFillLevel() {
  const { isLoading, bins } = useBins();
  const [selectedBin, setSelectedBin] = useState(
    bins.length > 0 ? bins[0].id : null
  );

  // Set selected data to the first bin ID when the component mounts
  useEffect(() => {
    if (bins.length > 0) {
      setSelectedBin(bins[0].id);
    }
  }, [bins]);

  function handleBinChange(event) {
    const selectedBin = event.target.value;
    const selectedBinId =
      selectedBin !== "Select a Bin" && parseInt(selectedBin, 10);
    setSelectedBin(selectedBinId);
  }

  const selectedBinData = selectedBin
    ? bins.find((bin) => bin.id === selectedBin)
    : null;

  /*  const fillLevelDate = selectedBinData
    ? selectedBinData.fillLevels.map((temp) => formatDate(temp.dateTime))
    : [];

  const fillLevelValue = selectedBinData
    ? selectedBinData.fillLevels.map((temp) => temp.value)
    : []; */

  const dailyAverages = selectedBinData
    ? calculateDailyAverage(selectedBinData.fillLevels)
    : {};

  // Convert dates to Date objects and sort
  const sortedDates = Object.keys(dailyAverages)
    .map((date) => new Date(date))
    .sort((a, b) => a - b)
    .map((date) => formatDate(date));

  const averageFillLevelDate = sortedDates;
  const averageFillLevelValue = sortedDates.map((date) => dailyAverages[date]);

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

  return (
    <>
      <Dropdown
        bins={bins}
        selectedBin={selectedBin}
        handleBinChange={handleBinChange}
      />

      {selectedBin && (
        <div className="line-graph">
          <Line data={data} options={options}></Line>
        </div>
      )}
    </>
  );
}

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
