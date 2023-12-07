import React from "react";
import { useBins } from "../contexts/BinContext";
import { useUserListContext } from "../contexts/UserListContext";
import { DataCard } from "../components/utils/DataCard";
import { HistoryTable } from "../components/Analytics/HistoryTable";
import "../styles/Analytics_css/Analytics.css"
import GroupIcon from '@mui/icons-material/Group';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import BarChartHumidity from "../components/utils/BarChartHumidity";
import BarChartTemp from "../components/utils/BarChartTemp";





export function Analytics() {
  const { bins } = useBins();
  const { users } = useUserListContext();
  const totalAdmin = users.filter(user => user.role === "municipality worker").length;
  const totalBins = bins.length;
  const totalGarbCollector = users.length - totalAdmin;

  return (
    <div>
      <div className="cards">
        <DataCard title={"Total Municipality Workers"} icon={<GroupIcon className="groupIcon"/>} data={totalAdmin} className={"totalUsers"} /> 
        <DataCard title={"Total Garbage Collectors"} icon={<GroupIcon className="groupIcon"/>} data={totalGarbCollector} className={"totalUsers"} /> 
        <DataCard title={"Total Garbage Bins"} icon={<DeleteSweepIcon className="binIcon"/>} data={totalBins} className={"totalBins"} />
      </div>
    <BarChartHumidity />
    <BarChartTemp />
    <HistoryTable />

    </div>
  );
}

