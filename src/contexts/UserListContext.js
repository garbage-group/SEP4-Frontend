import { React, createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../contexts/BinContext";
import { useQuery } from "@tanstack/react-query";

export const UserContext = createContext();
// const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

function UserListProvider({ children }) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [users, setUsers] = useState([]);
  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));
  const token = localStorage.getItem("token");

  const {
    isLoading,
    data: users,
    isError,
  } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: fetchUsers,
    enabled: isAuthenticated,
  });

  async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    return response.json();
  }

  /*   useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
    // fetchUsers is defined inside UserListProvider and is not changing,
    // so it's safe to exclude it from the dependency array
  }, [isAuthenticated, token]); */

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
