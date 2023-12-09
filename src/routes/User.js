import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import { IndividualUserComponent } from "../components/users/InvidualUser";
import { useUserListContext } from "../contexts/UserListContext";
import { AddUser } from "../components/users/AddUser";

/* import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined"; */
// import RefreshIcon from "@mui/icons-material/Refresh";

import { LoadingComponent } from "../components/LoadingError";
import { ExtraElements } from "../components/utils/ExtraElements";
import ReplayCircleFilledOutlinedIcon from "@mui/icons-material/ReplayCircleFilledOutlined";

import "../styles/user_css/User.css";
import { ListPagination } from "../components/utils/ListPagination";

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
      <div className="list-footer">
        <ListPagination
          totalItems={users ? users.length : 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}

// ListHeader component
function ListHeader({ users, currentUserRole, onAddUserClick }) {
  const { fetchUsers } = useUserListContext();

  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <div className="list-header">
      <p className="members-text">User</p>
      <div className="right-content">
        <ReplayCircleFilledOutlinedIcon
          color="primary"
          sx={{ fontSize: 45, color: "#133a64" }}
          onClick={handleRefresh}
        />

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
