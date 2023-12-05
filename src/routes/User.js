import React, { useEffect, useState } from "react";

import { Button, Chip } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { IndividualUserComponent } from "../components/users/InvidualUser";
import { useUserListContext } from "../contexts/UserListContext";
import { AddUser } from "../components/users/AddUser";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// import RefreshIcon from "@mui/icons-material/Refresh";

import "../styles/user_css/User.css";
import { LoadingComponent } from "../components/LoadingError";

const currentUserRole = localStorage.getItem("role");

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
  const [currentUserRole, setCurrentUserRole] = useState(
    localStorage.getItem("role")
  );

  useEffect(() => {
    // Update the role when it changes in localStorage
    setCurrentUserRole(localStorage.getItem("role"));
  }, []);

  // Use UserListContext to fetch user data
  const { isLoading, users: data } = useUserListContext();

  function handleAddButtonClick() {
    alert("Clicked");
  }

  // Extra elements component
  function ExtraElements({ region, role }) {
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
          className={`userminus-icon ${currentUserRole !== "municipality worker" ? "disabled" : ""
            }`}
        />

        <ModeEditOutlineOutlinedIcon
          data-testid="edit-button"
          className={`useredit-icon ${currentUserRole !== "municipality worker" ? "disabled" : ""
            }`}
        />
      </div>
    );
  }

  return (
    <div className="userlist-container">
      {/* Render list header */}
      <div className="list-header">
        <p className="members-text">User</p>

        {/* Render right content with user count and Add User button */}
        <div className="right-content">
          <p className="number-of-users">{data ? data.length : 0} users</p>
          {/* <RefreshIcon className="refresh-icon" onClick={handleRefreshClick} /> */}
          <Button
            variant="contained"
            className={`add-member-button ${currentUserRole !== "municipality worker" ? "disabled" : ""
              }`}
            endIcon={<PersonAddAltRoundedIcon />}
            onClick={handleAddButtonClick}
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Render list body with individual user components */}
      <div className="list-body">
        {isLoading && <LoadingComponent />}

        {/* Render users if data is available */}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          data.map((user, index) => (
            <IndividualUserComponent
              key={index}
              username={user.username}
              fullname={user.fullname}
              showExtraElements={true}
              extraElements={
                <ExtraElements region={user.region} role={user.role} />
              }
            />
          ))}
      </div>
    </div>
  );
}

// FilterContainer component
function FilterContainer() {
  return <div className="filter-container">
    <AddUser />

  </div>;
}

// Export Users component
export { Users };
