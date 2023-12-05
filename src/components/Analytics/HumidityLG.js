import React from "react";
import { useBins } from "../../contexts/BinContext";
import { LineChart } from "@mui/x-charts";

function HumidityLGComponent() {
  const { bins, isLoading } = useBins();
  const humidity_data = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  const temperature_data = [20, 22, 25, 28, 30, 32, 28, 26, 24, 22, 20];
  const timestamp_array = [
    "2023-01-01 ",
    "2023-01-02 ",
    "2023-01-03 ",
    "2023-01-04 ",
    "2023-01-05 ",
    "2023-01-06 ",
    "2023-01-07",
    "2023-01-08 ",
    "2023-01-09 ",
    "2023-01-10",
    "2023-01-11",
  ];

  return (
    <div>
      <LineChart
        width={1000}
        height={300}
        series={[
          { curve: "catmullRom", data: humidity_data, label: "Humidity" },
          { curve: "catmullRom", data: temperature_data, label: "Temperature" },
        ]}
        xAxis={[{ scaleType: "point", data: timestamp_array }]}
      />
    </div>
  );
}

export { HumidityLGComponent };
