import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import { IndividualUserComponent } from "../components/users/InvidualUser";
import { useUserListContext } from "../contexts/UserListContext";
import { AddUser } from "../components/users/AddUser";
import { LoadingComponent } from "../components/LoadingError";
import { ExtraElements } from "../components/utils/ExtraElements";
import ReplayCircleFilledOutlinedIcon from "@mui/icons-material/ReplayCircleFilledOutlined";

import "../styles/user_css/User.css";
import { ListPagination } from "../components/utils/ListPagination";
import { useUserManagement } from "../contexts/UserContext";

// UserListContainer component
function UserListContainer({
  onAddUserClick,
  onHandleUserClick,
  currentUserRole,
  setCurrentUserRole,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Use UserListContext to fetch user data
  const { isLoading, users } = useUserListContext();

  const itemsPerPage = 6;


  useEffect(() => {
    // Update the role when it changes in localStorage
    setCurrentUserRole(localStorage.getItem("role"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddButtonClick = () => {
    onAddUserClick();
  };

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredUsers = users.filter(
    (user) => user.role.toLowerCase() === "garbage collector"
  );

  return (
    <div className="userlist-container">
      {/* Render list header */}
      <ListHeader
        users={filteredUsers}
        currentUserRole={currentUserRole}
        onAddUserClick={handleAddButtonClick}
      />

      {/* Render list body with individual user components */}
      <ListBody
        isLoading={isLoading}
        users={filteredUsers}
        startIndex={startIndex}
        endIndex={endIndex}
        currentUserRole={currentUserRole}
        onHandleUserClick={onHandleUserClick}
      />

      {/* Render list footer with pagination */}
      <div className="list-footer" data-testid="user-list-footer">
        <ListPagination
          totalItems={filteredUsers ? filteredUsers.length : 0}
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
function ListBody({
  isLoading,
  users,
  startIndex,
  endIndex,
  currentUserRole,
  onHandleUserClick,
}) {
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
                  username={user.username}
                />
              }
              onHandleUserClick={onHandleUserClick}
            />
          ))}
    </div>
  );
}

// Add user component
function AddUserContainer({
  showTitle,
  selectedUser,
  isManagingUser,
  canManageUser,
  setSelectedUser,
}) {
  return (
    <div className="addUser-container">
      {canManageUser ? (
        <AddUser
          showTitle={showTitle}
          selectedUser={selectedUser}
          isManagingUser={isManagingUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <p>Only Municipality worker can manage user</p>
      )}
    </div>
  );
}

// Users component
function Users() {
  const [selectedUser, setSelectedUser] = useState();
  const [isAddUserClicked, setIsAddUserClicked] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState(
    localStorage.getItem("role")
  );  const [isManagingUser,setIsManagingUser] = useState(false);


  const { fetchUserByUsername } = useUserManagement();

  const handleToggleAddUser = () => {
    setIsAddUserClicked(true);
    setIsManagingUser(false)
  };

  async function handleUserClick(username) {
    const user = await fetchUserByUsername(username);
    setSelectedUser(user);
    setIsAddUserClicked(false);
    setIsManagingUser(true)
  }

  return (
    <div className="users-container">
      <UserListContainer
        onAddUserClick={handleToggleAddUser}
        onHandleUserClick={handleUserClick}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
      />

      <AddUserContainer
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        showTitle={isAddUserClicked ? "Add User" : "Manage User"}
        canManageUser={currentUserRole === "municipality worker" ? true : false}
        isManagingUser={isManagingUser}
      />
    </div>
  );
}

// Export Users component
export { Users };
