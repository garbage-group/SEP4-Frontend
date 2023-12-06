import React, { useEffect, useState } from "react";

import { Button, Pagination } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import { IndividualUserComponent } from "../components/users/InvidualUser";
import { useUserListContext } from "../contexts/UserListContext";
import { AddUser } from "../components/users/AddUser";
import { LoadingComponent } from "../components/LoadingError";
import { ExtraElements } from "../components/utils/ExtraElements";

import "../styles/user_css/User.css";

// UserListContainer component
function UserListContainer({ onAddUserClick }) {
  const [currentUserRole, setCurrentUserRole] = useState(
    localStorage.getItem("role")
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Use UserListContext to fetch user data
  const { isLoading, users } = useUserListContext();

  const itemsPerPage = 6;

  useEffect(() => {
    // Update the role when it changes in localStorage
    setCurrentUserRole(localStorage.getItem("role"));
  }, []);

  const handleAddButtonClick = () => {
    onAddUserClick();
  };

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="userlist-container">
      {/* Render list header */}
      <ListHeader
        users={users}
        currentUserRole={currentUserRole}
        onAddUserClick={handleAddButtonClick}
      />

      {/* Render list body with individual user components */}
      <ListBody
        isLoading={isLoading}
        users={users}
        startIndex={startIndex}
        endIndex={endIndex}
        currentUserRole={currentUserRole}
      />

      {/* Render list footer with pagination */}
      <ListFooter
        users={users}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />
    </div>
  );
}

// ListHeader component
function ListHeader({ users, currentUserRole, onAddUserClick }) {
  return (
    <div className="list-header">
      <p className="members-text">User</p>
      <div className="right-content">
        <p className="number-of-users">{users ? users.length : 0} users</p>
        <Button
          variant="contained"
          className={`add-member-button ${
            currentUserRole !== "municipality worker" ? "disabled" : ""
          }`}
          endIcon={<PersonAddAltRoundedIcon />}
          onClick={onAddUserClick}
        >
          Add User
        </Button>
      </div>
    </div>
  );
}

// ListBody component
function ListBody({ isLoading, users, startIndex, endIndex, currentUserRole }) {
  return (
    <div className="list-body">
      {isLoading && <LoadingComponent />}
      {!isLoading &&
        users &&
        Array.isArray(users) &&
        users
          .slice(startIndex, endIndex)
          .map((user, index) => (
            <IndividualUserComponent
              key={index}
              username={user.username}
              fullname={user.fullname}
              showExtraElements={true}
              extraElements={
                <ExtraElements
                  region={user.region}
                  role={user.role}
                  currentUserRole={currentUserRole}
                />
              }
            />
          ))}
    </div>
  );
}

// ListFooter component
function ListFooter({
  users,
  itemsPerPage,
  currentPage,
  handlePaginationChange,
}) {
  return (
    <div className="list-footer">
      <Pagination
        count={Math.ceil(users.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePaginationChange}
      />
    </div>
  );
}

// Add user component
function AddUserContainer() {
  return (
    <div className="addUser-container">
      <AddUser />
    </div>
  );
}

// Users component
function Users() {
  const [showAddUser, setShowAddUser] = useState(false);

  const handleToggleAddUser = () => {
    setShowAddUser(!showAddUser);
  };

  return (
    <div className="users-container">
      <UserListContainer onAddUserClick={handleToggleAddUser} />
      {showAddUser && <AddUserContainer />}
    </div>
  );
}

// Export Users component
export { Users };
