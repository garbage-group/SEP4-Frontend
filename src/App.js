import "../src/styles/App.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import { Overview } from "./routes/Overview";
import { Collectors } from "./routes/Collectors";
import { Analytics } from "./routes/Analytics";
import { NotFound } from "./components/NotFound";

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/collectors",
        element: <Collectors />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
    ],
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
