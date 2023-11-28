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

import "../../styles/overview_css/ListOfCollectors.css";
import { FetchListOfUsers } from "../../routes/Collectors";
import { NavLink } from "react-router-dom";

export function ListOfCollectors() {
  const { isLoading, isError, data: collectorsData } = FetchListOfUsers();

  return (
    <div className="list-container">
      <div className="title-container">
        <p>Garbage Collectors</p>

        <NavLink to="/collectors" className="view-users">
          View All Users
        </NavLink>
      </div>
      <List>
        {isLoading && <p>Loading.....</p>}
        {isError && <p>Error loading data</p>}

        {!isLoading &&
          collectorsData &&
          Array.isArray(collectorsData) &&
          collectorsData.map((collector, index) => (
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
      <ListItemAvatar>
        <Avatar {...stringAvatar(fullname)} />
      </ListItemAvatar>
      <ListItemText primary={fullname} secondary={`@${username}`} />
    </ListItem>
  );
}

function stringToColor(string) {
  const colour = stc(string);
  return colour;
}

function stringAvatar(fullname) {
  const bgColor = { bgcolor: stringToColor(fullname) };
  const [firstName, lastName] = fullname.split(" ");
  const initials = firstName[0] + (lastName ? lastName[0] : "");

  return { sx: bgColor, children: initials };
}
