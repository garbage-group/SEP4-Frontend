import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../images/logo.png";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/LoginAuthContext";


export function Navbar() {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const {logout} = useAuth();

  const navigate = useNavigate();
  // Function to toggle the dropdown menu
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  function handleLogout(e) {
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
