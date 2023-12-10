// UpdateUser.js
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

export function UpdateUser({ user, onSave }) {
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    // Initialize updatedUser with the existing user data
    setUpdatedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    // Update the state when input fields change
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSaveClick = () => {
    // Call the onSave function with the updated user data
    onSave(updatedUser);
  };

  return (
    <div>
      <TextField
        label="Full Name"
        name="fullname"
        value={updatedUser.fullname || ""}
        onChange={handleInputChange}
      />
      <TextField
        label="Username"
        name="username"
        value={updatedUser.username || ""}
        onChange={handleInputChange}
      />
      {/* Add more fields as needed for other user properties */}
      <Button variant="contained" onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
}
