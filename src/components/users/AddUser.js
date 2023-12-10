import React, { useEffect, useState } from "react";
import "../../styles/user_css/AddUser.css";
import humanIcon from "../../styles/images/human_icon.png";
import passwordIcon from "../../styles/images/password.png";
import pencilIcon from "../../styles/images/pencil.png";
import { Button } from "../Button";
import { useUserManagement } from "../../contexts/UserContext";
import Modal from "../Modal.js";

// AddUser component
function AddUser({ selectedUser, showTitle, isManagingUser, setSelectedUser }) {
  // Access the user management context
  const { addUser, isLoading, deleteUser } = useUserManagement();

  // State variables for form input fields
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [region, setRegion] = useState("Horsens North"); // Default to first option
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // State variables for modal message and its visibility
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      console.log("Before Delete: " + selectedUser.username);

      await deleteUser(selectedUser.username);
      showModal(`Successfully deleted username: ${selectedUser.username}`);
      setSelectedUser(null);
      console.log("After Delete: " + selectedUser);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // Function to handle the user addition
  async function handleAddUser() {
    // Validate form input fields
    if (!username || !fullName || !region || !password || !repeatPassword) {
      showModal("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
      showModal("Passwords do not match. Please re-enter your passwords.");
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
      // Call the addUser function from the user management context
      await addUser(userData);
      showModal(`Successfully signed up: ${username}`);

      // Reset form after successful signup
      setUsername("");
      setFullName("");
      setRegion("Horsens North"); // Reset to the default value
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      showModal(error.message);
    }
  }

  // Function to Reset all variables
  function handleReset() {
    setUsername("");
    setFullName("");
    setRegion("Horsens North"); // Default to the first option or any other default value you want
    setPassword("");
    setRepeatPassword("");
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
              onChange={function (e) {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="input-text">
            <img src={humanIcon} alt="Full Name Icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={function (e) {
                setFullName(e.target.value);
              }}
            />
          </div>

          <div className="input-text">
            <img src={pencilIcon} alt="Region Icon" />
            <select
              value={region}
              onChange={function (e) {
                setRegion(e.target.value);
              }}
              className="region-select"
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
              value={password}
              onChange={function (e) {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="input-text">
            <img src={passwordIcon} alt="Repeat Password Icon" />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={function (e) {
                setRepeatPassword(e.target.value);
              }}
            />
          </div>
          <div>
            {isManagingUser ? (
              <ManageUserButtons
                handleDeleteClick={handleDeleteClick}
                selectedUser={selectedUser}
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

// ManageUserButtons component
function ManageUserButtons({ handleDeleteClick, selectedUser }) {
  const isRemoveButtonDisabled = !selectedUser;

  return (
    <div className="manage-user-buttons-container">
      <Button className="adduser-signup-btn">Edit</Button>
      <Button className="adduser-signup-btn">Save</Button>
      <Button
        className={`adduser-signup-btn ${isRemoveButtonDisabled ? "adduser-signup-btn_disabled" : ""
          }`}
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




export { AddUser };
