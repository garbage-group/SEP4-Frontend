import { Link } from "react-router-dom";
import "../../styles/Bin_css/BinNav.css";

function BinNav() {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to={"binList"}>List of Bins</Link>
                </li>
            </ul>
        </nav>
    )
}

export default BinNav;
