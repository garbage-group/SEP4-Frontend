import { React, createContext, useContext } from "react";
import { useQuery } from "react-query";

export const UserContext = createContext();

function UserListProvider({ children }) {
  const { isLoading, isError, data } = useQuery(
    "collectorsData",
    () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    {
      staleTime: Infinity,
    }
  );

  return (
    <UserContext.Provider value={{ isLoading, isError, data }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserListContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("user context was outside userlistprovider");
  }
  // console.log(context);
  return context;
}

export { UserListProvider, useUserListContext };
