import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Overview } from "./routes/Overview";
import { Collectors } from "./routes/Collectors";
import { Bins } from "./routes/Bins";
import { Analytics } from "./routes/Analytics";
import { Map } from "./routes/Map";
import { Root } from './routes/Root'
import "../src/styles/App.css";
import { QueryClient, QueryClientProvider } from "react-query";

export default App;
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
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}
