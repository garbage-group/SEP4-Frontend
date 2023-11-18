import "../src/styles/App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import { Overview } from "./routes/Overview";
import { Collectors } from "./routes/Collectors";
import { Analytics } from "./routes/Analytics";

const queryClient = new QueryClient();

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
