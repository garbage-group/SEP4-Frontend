import React from "react";

import { RouterProvider, createHashRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";

import { Overview } from "./routes/Overview";
import { Users } from "./routes/User";
import { Bins } from "./routes/Bins";
import { Analytics } from "./routes/Analytics";
import { Map } from "./routes/Map";
import { Root } from "./routes/Root";
import { UserListProvider } from "./contexts/UserListContext";

import "../src/styles/App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "./routes/Login";
import { AuthProvider } from "./contexts/LoginAuthContext";
import BinList from "./components/Bin/BinList";
// import { Spinner } from "./components/Spinner";a
import { BinProvider } from "./contexts/BinContext";
import { NotificationProvider } from "./contexts/NotificationContext";

const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/users",
        element: <Users />,
      },

      {
        path: "/bins",
        element: <Bins />,
        children: [
          {
            path: "",
            element: <BinList />,
          },
          {
            path: "binList",
            element: <BinList />,
          },
          {
            path: "bins/form",
            element: <p>Form</p>,
          },
        ],
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
        <AuthProvider>
          <BinProvider>
            <UserListProvider>
              <NotificationProvider>
                <RouterProvider router={router} />
              </NotificationProvider>
            </UserListProvider>
          </BinProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;