import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { useBins } from "../../contexts/BinContext";
import { Dropdown } from "../utils/Dropdown";
import  "../../styles/Analytics_css/BarChartTemp.css"

Chartjs.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));

function BarChartTemp() {
  const { bins } = useBins();
  const [selectedBin, setSelectedBin] = useState(
    bins.length > 0 ? bins[0].id : null
  );

  const handleBinChange = (event) => {
    const selectedBinValue = event.target.value;
    // Parse the selectedBinValue to an integer
    const selectedBinId =
      selectedBinValue !== "Select a Bin" && parseInt(selectedBinValue, 10);
    setSelectedBin(selectedBinId);
  };

  // Set selected data to the first bin ID when the component mounts
  useEffect(() => {
    if (bins.length > 0) {
      setSelectedBin(bins[0].id);
    }
  }, [bins]);

  const selectedBinData = selectedBin
    ? bins.find((bin) => bin.id === selectedBin)
    : null;

  const tempDate = selectedBinData
    ? selectedBinData.temperatures.map(
      (temp) => formatDate(temp.dateTime))
    : [];

  const tempValue = selectedBinData
    ? selectedBinData.temperatures.map(
      (temp) => temp.value)
    : [];

  const data = {
    labels: tempDate,
    datasets: [
      {
        label: "Temperature of a Bin",
        data: tempValue,
        backgroundColor: "aqua",
        borderColor: "black",
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
      <Dropdown
        bins={bins}
        selectedBin={selectedBin}
        handleBinChange={handleBinChange}
      />
      {selectedBin && (
        <div style={{ width: "400px", padding: "20px" }} className="barChartTemp">
          <Bar
            data={data}
            options={options}>
          </Bar>
        </div>
      )}
    </div>
  );
}

export default BarChartTemp;
