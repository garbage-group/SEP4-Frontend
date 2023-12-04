import { Link} from "react-router-dom";
import "../../styles/Bin_css/BinNav.css";
import { useState } from "react";

function BinNav() {
    const [activeLink, setActiveLink] = useState('binList');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link
                        to="binList"
                        onClick={() => handleLinkClick('binList')}
                        style={{ color: activeLink === 'binList' ? 'black' : 'grey' }}
                    >
                        List of Bins
                    </Link>
                </li>
                <li>
                    <Link
                        to="form"
                        onClick={() => handleLinkClick('form')}
                        style={{ color: activeLink === 'form' ? 'black' : 'grey' }}
                    >
                        Add Bin
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default BinNav;
