import React from "react";

import { Button, Chip } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { IndividualUserComponent } from "../components/users/InvidualUser";
import { useUserListContext } from "../contexts/UserListContext";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import "../styles/user_css/User.css";

// Users component
function Users() {
  return (
    <div className="users-container">
      {/* Render UserListContainer and FilterContainer components */}
      <UserListContainer />
      <FilterContainer />
    </div>
  );
}

// UserListContainer component
function UserListContainer() {
  // Use UserListContext to fetch user data
  const { isLoading, isError, data } = useUserListContext();

  return (
    <div className="userlist-container">
      {/* Render list header */}
      <div className="list-header">
        <p className="members-text">User</p>

        {/* Render right content with user count and Add User button */}
        <div className="right-content">
          <p className="number-of-users">{data ? data.length : 0} users </p>
          <Button
            variant="contained"
            className="add-member-button"
            endIcon={<PersonAddAltRoundedIcon />}
          >
            Add User
          </Button>
        </div>
      </div>

      {isLoading && <p>Loading.....</p>}
      {isError && <p>Error loading data</p>}

      {/* Render list body with individual user components */}
      <div className="list-body">
        {/* Render users if data is available */}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          data.map((collector, index) => (
            <IndividualUserComponent
              key={index}
              username={collector.username}
              fullname={collector.name}
              showExtraElements={true}
              extraElements={
                <ExtraElements region={collector.address.city} role={"Admin"} />
              }
            />
          ))}
      </div>
    </div>
  );
}

// Extra elements component
function ExtraElements({ region, role }) {
  return (
    <div className="extra-elements" a>
      <Chip
        icon={<PlaceOutlinedIcon />}
        label={region ? region : "N/A"}
        sx={{ m: 1 }}
        className="extra-elements-chip"
      />
      <Chip
        label={role}
        icon={<PersonOutlineOutlinedIcon />}
        className="extra-elements-chip"
        sx={{ m: 1 }}
      />

      {/* Disables edit and remove button if user is not admin */}
      <div className="userminus-wrapper">
        <PersonRemoveOutlinedIcon
          data-testid="remove-button"
          className={`userminus-icon ${role !== "Admin" ? "disabled" : ""}`}
        />
      </div>

      <div className="userminus-wrapper">
        <ModeEditOutlineOutlinedIcon
          data-testid="edit-button"
          className={`useredit-icon ${
            role === "Garbage Collector" ? "disabled" : ""
          }`}
        />
      </div>
    </div>
  );
}

// FilterContainer component
function FilterContainer() {
  return <div className="filter-container"></div>;
}

// Export Users component
export { Users };
