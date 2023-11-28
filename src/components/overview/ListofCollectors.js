import React from "react";

import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import stc from "string-to-color";
import { useNavigate } from "react-router-dom";

import "../../styles/overview_css/ListOfCollectors.css";
import { useUserListContext } from "../../contexts/UserListContext";

// Component to display a list of collectors
export function ListOfCollectors() {
  const { isLoading, isError, data } = useUserListContext();
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
        {isLoading && <p>Loading.....</p>}
        {isError && <p>Error loading data</p>}

        {/* Render 5 users if data is available */}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          data
            .filter((item, index) => index < 5)
            .map((collector, index) => (
              <CollectorComponent
                key={index}
                username={collector.username}
                fullname={collector.name}
              />
            ))}
      </List>
    </div>
  );
}

// Component to display individual collector information
function CollectorComponent({ fullname, username }) {
  return (
    <ListItem
      className="listitem-collector"
      style={{ width: "auto" }}
      secondaryAction={
        <IconButton edge="end">
          <MoreVertOutlined />
        </IconButton>
      }
    >
      {/* Displaying collector avatar and information */}
      <ListItemAvatar>
        <Avatar {...stringAvatar(fullname)} />
      </ListItemAvatar>
      <ListItemText primary={fullname} secondary={`@${username}`} />
    </ListItem>
  );
}

// Function to convert a string to a color
function stringToColor(string) {
  const colour = stc(string);
  return colour;
}

// Function to generate an avatar from a string
function stringAvatar(fullname) {
  const bgColor = { bgcolor: stringToColor(fullname) };
  const [firstName, lastName] = fullname.split(" ");
  const initials = firstName[0] + (lastName ? lastName[0] : "");

  return { sx: bgColor, children: initials };
}
