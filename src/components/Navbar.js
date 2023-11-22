import React from "react";
import "../styles/Navbar.css";
import { Button } from "./Button";

export function Navbar() {
  return <div className="navbar-container">
    <Button className="button">Sign Out</Button>
  </div>;
}
