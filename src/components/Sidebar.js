import "../styles/Sidebar.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [topPosition, setTopPosition] = useState("3vh");

  useEffect(() => {
    const storedPostion = localStorage.getItem("activePosition");

    if (storedPostion) {
      setTopPosition(storedPostion);
    }
  }, []);

  function handleNavItemClick(newTopPosition) {
    setTopPosition(newTopPosition);
    localStorage.setItem("activePosition", newTopPosition);
  }

  return (
    <div className="sidebar-container">
      <div className="selected-element" style={{ top: topPosition }}></div>

      <div className="navs">
        <NavItem
          to="/"
          linkText="Overview"
          icon={<HomeOutlinedIcon />}
          className="nav-element active"
          onClick={() => handleNavItemClick("3vh")}
        />

        <NavItem
          to="/collectors"
          linkText="Collectors"
          icon={<GroupOutlinedIcon />}
          className="nav-element"
          onClick={() => handleNavItemClick("11vh")}
        />

        <NavItem
          to="/bins"
          linkText="Bins"
          icon={<DeleteOutlineOutlinedIcon />}
          className="nav-element"
          onClick={() => handleNavItemClick("20vh")}
        />

        <NavItem
          to="/map"
          linkText="Map"
          icon={<MapOutlinedIcon />}
          className="nav-element"
          onClick={() => handleNavItemClick("28vh")}
        />

        <NavItem
          to="/analytics"
          linkText="Analytics"
          icon={<AnalyticsOutlinedIcon />}
          className="nav-element"
          onClick={() => handleNavItemClick("36.5vh")}
        />
      </div>
    </div>
  );
}

function NavItem({ to, icon, linkText, onClick, className }) {
  return (
    <div to={to} onClick={onClick} className={className}>
      {icon}
      <p>{linkText}</p>
    </div>
  );
}
