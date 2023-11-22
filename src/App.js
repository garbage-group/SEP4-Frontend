
import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
// import { HumidityDisplay } from "./components/HumidityDisplay";
import { Overview } from "./routes/Overview";
import { Collectors } from "./routes/Collectors";
import { Bins } from "./routes/Bins";
import { Analytics } from "./routes/Analytics";
import { Root } from './routes/Root'

import "../src/styles/App.css";
import { QueryClient, QueryClientProvider } from "react-query";


const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Overview />
      },
      {
        path: "/collectors",
        element: <Collectors />
      },
      {
        path: "/bins",
        element: <Bins />
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider> 
  );
}
