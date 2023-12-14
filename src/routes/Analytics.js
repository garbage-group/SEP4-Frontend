import React from "react";


import GroupIcon from "@mui/icons-material/Group";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import BarChartHumidity from "../components/Analytics/BarChartHumidity";
import BarChartTemp from "../components/Analytics/BarChartTemp";
import { useBins } from "../contexts/BinContext";
import { useUserListContext } from "../contexts/UserListContext";
import { DataCard } from "../components/Analytics/DataCard";
import { HistoryTable } from "../components/Analytics/HistoryTable";
import { LineChartFillLevel } from "../components/Analytics/LineChartFillLevel";
import {Spinner} from "../components/utils/Spinner";

import "../styles/Analytics_css/Analytics.css";



export function Analytics() {
  const { isLoading, bins } = useBins();
  const { users } = useUserListContext();
  const totalAdmin = users.filter(
    (user) => user.role === "municipality worker"
  ).length;
  const totalBins = bins.length;
  const totalGarbCollector = users.length - totalAdmin;

  return (
    <div className="analytics-container">
      <div className="cards-container">
        <DataCard
          title={"Total Municipality Workers"}
          icon={<GroupIcon className="groupIcon" />}
          data={totalAdmin}
          className={"totalUsers"}
        />
        <DataCard
          title={"Total Garbage Collectors"}
          icon={<GroupIcon className="groupIcon" />}
          data={totalGarbCollector}
          className={"totalUsers"}
        />
        <DataCard
          title={"Total Garbage Bins"}
          icon={<DeleteSweepIcon className="binIcon" />}
          data={totalBins}
          className={"totalBins"}
        />
      </div>

      <div className="stats-container">
        <div className="history-table-container">
          <HistoryTable />
        </div>
        <div className="graph-container">
          {isLoading && <Spinner />}
          {!isLoading && <TabComponet />}
        </div>
      </div>
    </div>
  );
}

function TabComponet() {
  return (
    <>
      <Tabs>
        <TabList className={"tabList"}>
          <Tab>Temperature</Tab>
          <Tab>Humidity</Tab>
          <Tab>Fill Level</Tab>
        </TabList>

        <TabPanel>
          <BarChartTemp />
        </TabPanel>
        <TabPanel>
          <BarChartHumidity />
        </TabPanel>
        <TabPanel>
          <LineChartFillLevel />
        </TabPanel>
      </Tabs>
    </>
  );
}
