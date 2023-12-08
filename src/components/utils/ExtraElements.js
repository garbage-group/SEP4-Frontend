import React from "react";
import { Chip, IconButton } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useUserManagement } from "../../contexts/UserContext";
import "../../styles/utils_css/ExtraElements.css";

function ExtraElements({ region, role, currentUserRole, username }) {
  const { deleteUser } = useUserManagement();

  const handleDeleteClick = async () => {
    try {
      await deleteUser(username);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

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

      {/* Display the Delete button */}
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={handleDeleteClick}
        className={`userminus-icon ${
          currentUserRole !== "municipality worker" ? "disabled" : ""
        }`}
      >
        <PersonRemoveOutlinedIcon data-testid="remove-button" />
      </IconButton>

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
