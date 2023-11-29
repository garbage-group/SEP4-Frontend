import React from "react";

import { Button } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { IndividualUserComponent } from "../components/users/InvidualUser";
import { useUserListContext } from "../contexts/UserListContext";

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
        <p className="members-text">Garbage Collectors</p>

        {/* Render right content with user count and Add User button */}
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
              extraElements={<div>Need to add Region, role</div>}
            />
          ))}
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
