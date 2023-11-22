import React from "react";
import "../styles/Navbar.css";
import { Button } from "./Button";

export function Navbar({setIsLoggedIn}) {
  function handleSignOut(){
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false")
  }

  return <div className="navbar-container">
    <Button onClick={handleSignOut} className="button">Sign Out</Button>
  </div>;
}
