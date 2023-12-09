import React from "react";

import { Chip } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import "../../styles/utils_css/ExtraElements.css";

function ExtraElements({ region, role, currentUserRole }) {
  return (
    <div className="extra-elements">
      <Chip
        icon={<PlaceOutlinedIcon />}
        label={region ? region : "N/A"}
        sx={{ m: 1 }}
        className="extra-elements-chip"
      />
      <Chip
        label={role ? role : "N/A"}
        icon={<PersonOutlineOutlinedIcon />}
        className="extra-elements-chip"
        sx={{ m: 1 }}
      />

      {/* Disables edit and remove button if user is not admin */}
      <PersonRemoveOutlinedIcon
        data-testid="remove-button"
        className={`userminus-icon ${
          currentUserRole !== "municipality worker" ? "disabled" : ""
        }`}
      />

      <ModeEditOutlineOutlinedIcon
        data-testid="edit-button"
        className={`useredit-icon ${
          currentUserRole !== "municipality worker" ? "disabled" : ""
        }`}
      />
    </div>
  );
}

export { ExtraElements };
