import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/logo.png";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/LoginAuthContext";
import Notifications from "../components/Notifications";

export function Navbar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="navbar-container">
      <div className="top-nav-left">
        <img src={logo} alt="logo" className="navbar-logo" />
      </div>

      <div className="top-nav-right">
        <Notifications />
        {/* <NotificationsNoneOutlinedIcon /> */}
        <button className="icon-button" onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
}
