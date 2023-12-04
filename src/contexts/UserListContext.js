import { React, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { fetchUserInfo } from "../api/FetchFromAPI";

export const UserContext = createContext();

function UserListProvider({ children }) {
  const queryKey = "collectorsData";
  const queryFn = () => fetchUserInfo();

  const { isLoading, isError, data, refetch } = useQuery(queryKey, queryFn, {
    staleTime: Infinity,
  });

  const refreshData = async () => {
    alert("Refresh");
    await refetch();
  };

  return (
    <UserContext.Provider value={{ isLoading, isError, data, refreshData }}>
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
