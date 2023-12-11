import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
// import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { UnAuthorizedPage } from "../components/utils/UnauthorizedPage";

export function Root() {
  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));

  return (
    <>
      {isAuthenticated ? (
        <>
          <div>
            <Navbar />
          </div>

          <div className="body-container">
            <Sidebar />
            <div className="outlet">
              <Outlet />
            </div>
          </div>

          <Footer />
        </>
      ) : (
        <UnAuthorizedPage />
      )}
    </>
  );
}
