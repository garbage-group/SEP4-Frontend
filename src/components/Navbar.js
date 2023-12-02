import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../images/logo.png";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/LoginAuthContext";


export function Navbar() {

  const {logout} = useAuth();

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

      <div className="top-nav-middle">
        <div className="search-bar">
          <input type="text" placeholder="Search bins, or collectors....." />
          <SearchIcon />
        </div>
      </div>

      <div className="top-nav-right">
        <div className="icon-button">
          <button onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
