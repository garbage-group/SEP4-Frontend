import React from "react";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { NavLink } from "react-router-dom";

import "../styles/Sidebar.css";

export function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar-container">
      <div className="navs">
        <NavItem
          to="/overview"
          linkText="Overview"
          icon={<HomeOutlinedIcon />}
          className="nav-element overview"
        />

        <NavItem
          to="/users"
          linkText="User"
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
          linkText="Plan Route"
          icon={<MapOutlinedIcon />}
          className="nav-element"
        />

        {role.toLowerCase() === "municipality worker" && (
          <NavItem
            to="/analytics"
            linkText="Analytics"
            icon={<AnalyticsOutlinedIcon />}
            className="nav-element"
          />
        )}
      </div>
    </div>
  );
}

function NavItem({ to, icon, linkText, className }) {
  return (
    <NavLink to={to} className={className}>
      {icon}
      <p>{linkText}</p>
    </NavLink>
  );
}
