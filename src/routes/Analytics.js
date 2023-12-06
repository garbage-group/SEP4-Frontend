import React from "react";
import { HistoryTable } from "../components/Analytics/HistoryTable";

export function Analytics() {
  return (
    <div>
      {/* <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 5, 8, 10],
            label: "X Axis Label",
          },
        ]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            label: "data",
          },
        ]}
        width={900}
        height={300}
      /> */}
      <HistoryTable />
    </div>
  );
}
