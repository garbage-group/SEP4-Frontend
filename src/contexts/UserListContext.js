import { React, createContext, useContext, useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import { BASE_URL } from "../contexts/BinContext";

export const UserContext = createContext();
const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

function UserListProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // console.log(isAuthenticated);

        console.log(users.fullname);

        setUsers(data);
      } catch (e) {
        alert(e.Message);
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, token]);

  /* const refreshData = async () => {
    alert("Refresh");
    await refetch();
  }; */

  return (
    <UserContext.Provider value={{ isLoading, users }}>
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
