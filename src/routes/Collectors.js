import React from "react";
import { useQuery } from "react-query";

const Collectors = () => {
  return <div>Collectors</div>;
};

function FetchListOfUsers() {
  //https://jsonplaceholder.typicode.com/users
  //https://peoplegeneratorapi.live/api/person/100
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

  return { isLoading, isError, data };
}

export { Collectors, FetchListOfUsers };
