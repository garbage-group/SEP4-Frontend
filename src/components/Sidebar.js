import "../styles/Sidebar.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="selected-element"></div>

      <div className="navs">
        <NavItem
          to="/"
          linkText="Overview"
          icon={<HomeOutlinedIcon />}
          className="nav-element active"
        />

        <NavItem
          to="/collectors"
          linkText="Collectors"
          icon={<GroupOutlinedIcon />}
          className="nav-element"
        />

        <NavItem
          to="/bins"
          linkText="Bins"
          icon={<DeleteOutlineOutlinedIcon />}
          className="nav-element"
        />

        <NavItem
          to="/map"
          linkText="Map"
          icon={<MapOutlinedIcon />}
          className="nav-element"
        />

        <NavItem
          to="/analytics"
          linkText="Analytics"
          icon={<AnalyticsOutlinedIcon />}
          className="nav-element"
        />
      </div>
    </div>
  );
}

function NavItem({ to, icon, linkText, onClick, className }) {
  return (
    <Link to={to} onClick={onClick} className={className}>
      {icon}
      <p>{linkText}</p>
    </Link>
  );
}
