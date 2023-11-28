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

const collectorsList = [
  { fullname: "Rajib Paudyal", username: "rajipkanxo01" },
  { fullname: "Suhani Pandey", username: "iamSuhani5" },
  { fullname: "Pramesh Shrestha", username: "prmsstha" },
];

export function ListOfCollectors() {
  return (
    <div className="list-container">
      <div className="title-container">
        <p>Garbage Collectors</p>
        <p>View All Users</p>
      </div>
      <List>
        {collectorsList.map((collector, index) => (
          <CollectorComponent key={index} {...collector} />
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
