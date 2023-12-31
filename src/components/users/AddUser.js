import React, { useEffect, useState } from "react";
import "../../styles/user_css/AddUser.css";
import humanIcon from "../../styles/images/human_icon.png";
import passwordIcon from "../../styles/images/password.png";
import pencilIcon from "../../styles/images/pencil.png";
import { useUserManagement } from "../../contexts/UserContext";
import { Button } from "../utils/Button.js";
import Modal from "../utils/Modal";

// AddUser component
function AddUser({ selectedUser, showTitle, setSelectedUser, isManagingUser }) {

  // Access the user management context
  const { addUser, isLoading, deleteUser, updateUser } = useUserManagement();

  // State variables for form input fields
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [region, setRegion] = useState("Horsens North");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newRegion, setNewRegion] = useState("Horsens North");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatPassword, setNewRepeatNewPassword] = useState("");

  // State variables for modal message and its visibility
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  // Default role for new users
  const USER_ROLE = "Garbage Collector";

  // Function to show the modal with a given message
  function showModal(message) {
    setModalMessage(message);
    setIsModalOpen(true);
  }

  // Function to close the modal
  function closeModal() {
    setIsModalOpen(false);
    setModalMessage("");
  }

  // Function to handle the user delete
  const handleDeleteClick = async () => {
    try {
      await deleteUser(selectedUser.username);
      showModal(`Successfully deleted: ${selectedUser.username}`);
      setUsername("");
      setNewFullName("");
      setNewRegion("Horsens North");
      setNewPassword("");
      setNewRepeatNewPassword("");
      setSelectedUser(null); // Clear selected user after action completion
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // Function to handle the user addition or update
  async function handleAddUser() {
    // Validate form input fields using formValidation
  const errorMessage = formValidation({
    username,
    fullName,
    region,
    password,
    repeatPassword,
  });

    // If errorMessage is not null, show the modal with the error message
    if (errorMessage) {
      showModal(errorMessage);
      return;
    }

    // Construct user data object
    const userData = {
      username,
      fullName,
      password,
      role: USER_ROLE,
      region,
    };


    try {  
        await addUser(userData);
        showModal(`Successfully signed up: ${username}`);
  
      // Reset form after successful signup or update
      setUsername("");
      setFullName("");
      setRegion("Horsens North");
      setPassword("");
      setRepeatPassword("");
      setSelectedUser(null); // Clear selected user after action completion
    } catch (error) {
      showModal(error.message);
    }
  }
   // Function to Reset all variables
   function handleReset() {
    setUsername("");
    setFullName("");
    setRegion("Horsens North");
    setPassword("");
    setRepeatPassword("");
    setSelectedUser(null); 
  }

 

  useEffect(() => {
    if ( selectedUser && isManagingUser) {
      setIsDisabled(true);
      setUsername(selectedUser.username);
      setNewFullName(selectedUser.fullname);
      setNewRegion(selectedUser.region);
      setNewPassword(selectedUser.password);
      setNewRepeatNewPassword(selectedUser.password);
    } else {
      setIsDisabled(false)
      setSelectedUser(null);
      setUsername("");
      setFullName("");
      setRegion("Horsens North");
      setPassword("");
      setRepeatPassword("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManagingUser, selectedUser, setIsDisabled]);

   function handleOnEditClick()
   {
    setIsDisabled(false);
   }
  

  // Function to handle the user addition or update
async function handleSaveClick() {
  // Validate form input fields using formValidation
  const errorMessage = formValidation({
    username,
    fullName : newFullName.trim(),
    region : newRegion,
    password : newPassword,
    repeatPassword : newRepeatPassword,
  });

  // If errorMessage is not null, show the modal with the error message
  if (errorMessage) {
    showModal(errorMessage);
    return;
  }

  const updatedUser = {
    username,
    newFullName,
    newRegion,
    newPassword,
    newRepeatPassword,
  };

  updateUser(username, updatedUser);
  showModal(`Successfully updated: ${username}`);
  setUsername("");
  setNewFullName("");
  setNewRegion("Horsens North");
  setNewPassword("");
  setNewRepeatNewPassword("");
  setSelectedUser(null); // Clear selected user after action completion
}


  return (
    <div className="adduser-page-container">
      <div className="adduser-background"></div>
      <div className="adduser-content">
        <div className="adduser-form-container">
          <div className="adduser-header">
            <div className="adduser-title">{showTitle}</div>
          </div>
          <div className="adduser-inputs">
            <img src={humanIcon} alt="Username Icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)} className={` ${isManagingUser ? "usernameDisabled" : ""}`}
            />
          </div>

          <div className="input-text">
            <img src={humanIcon} alt="Full Name Icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={`${isManagingUser ? newFullName : fullName}`}
              required
              onChange={(e) => isManagingUser ? setNewFullName(e.target.value): setFullName(e.target.value)} className={` ${isDisabled ? "usernameDisabled" : ""}`}
            />
          </div>

          <div className="input-text">
            <img src={pencilIcon} alt="Region Icon" />
            <select
              value={`${isManagingUser ? newRegion : region}`}
              required
              onChange={(e) => isManagingUser ? setNewRegion(e.target.value): setRegion(e.target.value)} className={`region-select ${isDisabled ? "usernameDisabled" : ""}`}
              
            >
              <option value="Horsens North">Horsens North</option>
              <option value="Horsens South">Horsens South</option>
              <option value="Horsens East">Horsens East</option>
              <option value="Horsens West">Horsens West</option>
            </select>
          </div>

          <div className="input-text">
            <img src={passwordIcon} alt="Password Icon" />
            <input
              type="password"
              placeholder="Password"
              value={`${isManagingUser ? newPassword : password}`}
              required
              onChange={(e) => isManagingUser ? setNewPassword(e.target.value): setPassword(e.target.value)} className={` ${isDisabled ? "usernameDisabled" : ""}`}
            />
          </div>

          <div className="input-text">
            <img src={passwordIcon} alt="Repeat Password Icon" />
            <input
              type="password"
              placeholder="Repeat Password"
              value={`${isManagingUser ? newRepeatPassword : repeatPassword}`}
              required
              onChange={(e) => isManagingUser ? setNewRepeatNewPassword(e.target.value): setRepeatPassword(e.target.value)}className={`${isDisabled ? "usernameDisabled" : ""}`}
            />
          </div>
          <div>
            {isManagingUser ? (
              <ManageUserButtons
                handleDeleteClick={handleDeleteClick}
                handleSaveClick = {handleSaveClick}
                selectedUser={selectedUser}
                // setEditing={setSelectedUser}  // Pass setSelectedUser instead of setEditing
                onSaveClick = {handleSaveClick}
                handleOnEditClick = {handleOnEditClick}
              />
            ) : (
              <AddUserButton
                handleAddUser={handleAddUser}
                handleReset={handleReset}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
      <Modal isOpened={isModalOpen} onClose={closeModal}>
        {modalMessage}
      </Modal>
    </div>
  );
}

function ManageUserButtons({ handleDeleteClick, selectedUser, handleOnEditClick, onSaveClick }) {
 
  const isRemoveButtonDisabled = !selectedUser;
 
  const handleEditClick = () => {
    handleOnEditClick() };
 
  const handleSaveClick = () => {
    onSaveClick();
  };
  
 
  return (
<div className="manage-user-buttons-container">
<Button className="adduser-signup-btn" onClick={handleSaveClick}>
          Save
</Button>
       
<Button className="adduser-signup-btn" onClick={handleEditClick} disabled={isRemoveButtonDisabled}>
            Edit
</Button>
<Button
            className={`adduser-signup-btn ${isRemoveButtonDisabled ? "adduser-signup-btn_disabled" : ""}`}
            onClick={handleDeleteClick}
>
            Remove
</Button>
</div>
  );
}

// AddUserButton component
function AddUserButton({ handleAddUser, handleReset, isLoading }) {
  return (
    <div className="adduser-buttons-container">
      <Button
        onClick={handleAddUser}
        disabled={isLoading}
        className="adduser-signup-btn"
      >
        {isLoading ? "Signing up" : "Sign Up"}
      </Button>
      <Button
        onClick={handleReset}
        className="adduser-reset-btn"
      >
        Cancel
      </Button>
    </div>
  );
}

function formValidation({ username, fullName, region, password, repeatPassword }) {
  // Check each field separately
  if (!username) {
    return "Please enter a username.";
  }

  if (!fullName) {
    return "Please enter a full name.";
  }

  if (!region) {
    return "Please select a region.";
  }

  if (!password) {
    return "Please enter a password.";
  }

  if (!repeatPassword) {
    return "Please enter repeat the password.";
  }

  // Check if passwords match
  if (password !== repeatPassword) {
    return "Passwords do not match. Please re-enter your passwords.";
  }

  // If all validations pass, return null or an empty string
  return null;
}



export { AddUser };