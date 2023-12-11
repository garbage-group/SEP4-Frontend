import { React, createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../contexts/BinContext";

export const UserContext = createContext();
// const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

function UserListProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));
  const token = localStorage.getItem("token");

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      alert(e.Message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
    // fetchUsers is defined inside UserListProvider and is not changing,
    // so it's safe to exclude it from the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  return (
    <UserContext.Provider value={{ isLoading, users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserListContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("user context was outside userlistprovider");
  }
  return context;
}

export { UserListProvider, useUserListContext };
