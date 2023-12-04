import React from "react";

import { useNavigate } from "react-router-dom";
import { CircularProgress, List } from "@mui/material";
import { useUserListContext } from "../../contexts/UserListContext";
import { IndividualUserComponent } from "../users/InvidualUser";

import "../../styles/overview_css/ListOfCollectors.css";

// Component to display a list of collectors
export function ListOfCollectors() {
  const { isLoading, users } = useUserListContext();
  const navigate = useNavigate();

  // Handler function to navigate to the "users" page
  function handleViewAllUsersClick() {
    navigate("/users");
  }

  // Main render method for the ListOfCollectors component
  return (
    <div className="list-container">
      <div className="title-container">
        <p>Garbage Collectors</p>

        <p onClick={handleViewAllUsersClick}> View All Users</p>
      </div>
      <List>
        {isLoading && <CircularProgress />}

        {/* Render 5 users if data is available */}
        {!isLoading &&
          users &&
          Array.isArray(users) &&
          users
            .filter((item, index) => index < 5)
            .map((collector, index) => (
              <IndividualUserComponent
                key={index}
                username={collector.username}
                fullname={collector.name}
              />
            ))}
      </List>
    </div>
  );
}
