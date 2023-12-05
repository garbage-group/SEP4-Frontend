import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import stc from "string-to-color";

import "../../styles/user_css/IndividualUser.css";

// Component to display individual collector information
export function IndividualUserComponent({
  fullname,
  username,
  showExtraElements = false,
  extraElements,
}) {
  // console.log(fullname);
  return (
    <ListItem className="listitem-collector" style={{ width: "auto" }}>
      {/* Displaying collector avatar and information */}
      <ListItemAvatar>
        <Avatar {...stringAvatar(fullname)} />
      </ListItemAvatar>
      <ListItemText primary={fullname} secondary={`@${username}`} />

      {/* Display extra elements if showExtraElements is true */}
      {showExtraElements && extraElements && (
        <div>
          {/* Rendering extra elements */}
          {extraElements}
        </div>
      )}
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
