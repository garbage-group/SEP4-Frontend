import React from "react";

import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { Overview } from "./routes/Overview";
import { Users } from "./routes/User";
import { Bins } from "./routes/Bins";
import { Analytics } from "./routes/Analytics";
import { Map } from "./routes/Map";
import { Root } from "./routes/Root";
import { UserListProvider } from "./contexts/UserListContext";

import "../src/styles/App.css";

export default App;
const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      
      {
        path: "/bins",
        element: <Bins />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserListProvider>
          <RouterProvider router={router} />
        </UserListProvider>
      </QueryClientProvider>
    </>
  );
}
