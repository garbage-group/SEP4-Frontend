import React from "react";
import "../styles/Navbar.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Navbar({setIsLoggedIn}) {
  const navigate = useNavigate();


  function handleSignOut(){
    navigate("/");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    
  }

  return <div className="navbar-container">
    <Button onClick={handleSignOut} className="signOut">Sign Out</Button>
  </div>;
}
