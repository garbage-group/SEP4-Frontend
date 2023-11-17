import "../styles/Sidebar.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

export function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="selected-element"></div>

      <div className="navs">
        <div className="nav-element active">
          <HomeOutlinedIcon />
          <p>Overview</p>
        </div>

        <div className="nav-element">
          <GroupOutlinedIcon />
          <p>Collectors</p>
        </div>

        <div className="nav-element">
          <DeleteOutlineOutlinedIcon />
          <p>Bins</p>
        </div>

        <div className="nav-element">
          <MapOutlinedIcon />
          <p>Maps</p>
        </div>

        <div className="nav-element">
          <AnalyticsOutlinedIcon />
          <p>Analytics</p>
        </div>
      </div>
    </div>
  );
}
