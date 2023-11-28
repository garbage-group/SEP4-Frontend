import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../images/logo.png";
import "../styles/Navbar.css";
// import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  function handleLogout() {
    navigate("/", { replace: true });
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  }


  return (
    <div className="navbar-container">
      <div className="top-nav-left">
        <img src={logo} alt="logo" className="navbar-logo" />
      </div>

      <div className="top-nav-middle">
        <div className="search-bar">
          <input type="text" placeholder="Search bins, or collectors....." />
          <SearchIcon />
        </div>
      </div>

      <div className="top-nav-right">
        <NotificationsNoneOutlinedIcon />
        <div className="icon-button">
          <button onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
