import React from "react";

import { Button } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import "../styles/user_css/User.css";

function Users() {
  return (
    <div className="users-container">
      <UserListContainer />
      <FilterContainer />
    </div>
  );
}

function UserListContainer() {
  return (
    <div className="userlist-container">
      <div className="list-header">
        <p className="members-text">Garbage Collectors</p>

        <div className="right-content">
          <p className="number-of-users"> 13 users </p>
          <Button
            variant="contained"
            className="add-member-button"
            endIcon={<PersonAddAltRoundedIcon />}
          >
            Add User
          </Button>
        </div>
      </div>

      <div className="list-body"></div>
    </div>
  );
}

function FilterContainer() {
  return <div className="filter-container"></div>;
}

export { Users };
