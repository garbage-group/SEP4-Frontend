import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
// import { Login } from "../components/Login";
import { Footer } from "../components/Footer";

export function Root() {
  return (
    <>
        <>
          <div>
            <Navbar  />
          </div>

          <div className="body-container">
            <Sidebar />
            <div className="outlet">
              <Outlet />
            </div>
          </div>

          <Footer />
        </>
      ) 
    </>
  );
}
