import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton} from "@mui/material";
import stc from "string-to-color";
import { ExtraElements } from "../utils/ExtraElements";
import "../../styles/user_css/IndividualUser.css";

export function IndividualUserComponent({
  fullname,
  username,
  showExtraElements = false,
  extraElements
}) {
  return (
    <ListItem className="listitem-collector" style={{ width: "auto" }}>
       {/* Displaying collector avatar and information */}
      <ListItemAvatar>
        <Avatar {...stringAvatar(fullname)} />
      </ListItemAvatar>
      <ListItemText primary={fullname} secondary={`@${username}`} />

      {/* Display extra elements if showExtraElements is true */}
      {showExtraElements && extraElements && <ExtraElements region="YourRegion" role="UserRole" currentUserRole="municipality worker" username={username} />}
   
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
