import { React, createContext, useContext, useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { BASE_URL } from "../contexts/BinContext";

export const UserContext = createContext();

function UserListProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));
  const token = localStorage.getItem("token");

  /* 
  const apiUrl = "https://jsonplaceholder.typicode.com/";

  const queryKey = "collectorsData";

  const { isLoading, isError, data, refetch } = useQuery(
    queryKey,
    () => {
      fetch(`${apiUrl}users`).then((res) => res.json());
    },
    {
      staleTime: Infinity,
    }
  ); */

  const apiUrl = "https://jsonplaceholder.typicode.com/";

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        console.log(isAuthenticated);

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
