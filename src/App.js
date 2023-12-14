import React from "react";
import { RouterProvider, createHashRouter, Navigate } from "react-router-dom";
import { Overview } from "./routes/Overview";
import { Users } from "./routes/User";
import { Bins } from "./routes/Bins";
import { Analytics } from "./routes/Analytics";
import { Map } from "./routes/Map";
import { Root } from "./routes/Root";
import { UserListProvider } from "./contexts/UserListContext";
import { Login } from "./routes/Login";
import { AuthProvider } from "./contexts/LoginAuthContext";
import BinList from "./components/Bin/BinList";
import Bin from "./components/Bin/Bin";
import { BinProvider } from "./contexts/BinContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { UserManagementProvider } from "./contexts/UserContext";

import "../src/styles/App.css";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import BinForm from "./components/Bin/BinForm";

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
            element: <Navigate to={"binList"} replace />,
          },
          {
            path: "binList",
            element: <BinList />,
          },
          {
            path: "binList/:id",
            element: <Bin />,
          },
          {
            path: "form",
            element: <BinForm />,
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

        <UserManagementProvider>
            <BinProvider>
              <UserListProvider>
                <NotificationProvider>
                  <RouterProvider router={router} />
                </NotificationProvider>
              </UserListProvider>
            </BinProvider>
        </UserManagementProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
