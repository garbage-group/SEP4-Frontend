import React, { useState } from "react";
import { RouterProvider, createHashRouter, Navigate } from "react-router-dom";
import { Overview } from "./routes/Overview";
import { Collectors } from "./routes/Collectors";
import { Bins } from "./routes/Bins";
import { Analytics } from "./routes/Analytics";
import { Map } from "./routes/Map";
import { Root } from './routes/Root'
import "../src/styles/App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Login } from "./routes/Login";
import { AuthProvider } from "./contexts/LoginAuthContext";
import BinList from "./components/Bin/BinList";

import { BinProvider } from "./contexts/BinContext";
import Bin from "./components/Bin/Bin";


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
        element: <Overview />
      },
      {
        path: "/collectors",
        element: <Collectors />
      },
      {
        path: "/bins",
        element: <Bins />,
        children: [
          {
            path: "",
            element: <Navigate to={"binList"} replace/>
          },
          {
            path: "binList",
            element: <BinList />
          },
          {
            path: "binList/:id",
            element: <Bin />
          },
          {
            path: "bins/form",
            element: <p>Form</p>
          },
        ],
      },
      {
        path: "/map",
        element: <Map />
      },
      {
        path: "/analytics",
        element: <Analytics />
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
            <RouterProvider router={router} />
          </BinProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;
