

import React, { useState } from "react";

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

Chartjs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip
);


const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    }).format(new Date(date));

function BarChartHumidity() {
    const { bins } = useBins();
    const [selectedBin, setSelectedBin] = useState(null);

    console.log(bins);
    console.log(typeof bins[0].id)

    const handleBinChange = (event) => {
        const selectedBinValue = event.target.value;
        console.log(selectedBinValue)
        // Parse the selectedBinValue to an integer
        const selectedBinId = selectedBinValue !== "Select a Bin" && parseInt(selectedBinValue, 10);
        setSelectedBin(selectedBinId);
    };

    console.log(typeof selectedBin);

    const selectedBinData = selectedBin
        ? bins.find((bin) => bin.id === selectedBin)
        : null;

        console.log(selectedBinData)

    const humidDate = selectedBinData
        ? selectedBinData.humidity.map((humid) => formatDate(humid.dateTime))
        : [];
    const humidValue = selectedBinData
        ? selectedBinData.humidity.map((humid) => humid.value)
        : [];

    const data = {
        labels: humidDate,
        datasets: [
            {
                label: "Humidity of a Bin",
                data: humidValue,
                backgroundColor: "orange",
                borderColor: "white",
                borderWidth: 1
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
            {selectedBin && (
                <div style={{ width: "500px", padding: "20px" }}>
                    <Bar data={data} options={options}></Bar>
                </div>
            )}
        </div>
    );
}

export default BarChartHumidity;
