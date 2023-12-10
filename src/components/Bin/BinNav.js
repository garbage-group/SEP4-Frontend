import { Link} from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import "../../styles/Bin_css/BinNav.css";
function BinNav() {
    const [activeLink, setActiveLink] = useState('binList');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const role = localStorage.getItem("role");

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleLinkClick = (link) => {
        if(role === "garbage collector" && link === "form"){
            setIsModalOpen(true)
        }else {
            setActiveLink(link);
        }
    };
    return (
        <>
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
                            to={role === "garbage collector" ? "binList" : "form"}
                            onClick={() => handleLinkClick('form')}
                            style={{ color: activeLink === 'form' ? 'black' : 'grey' }}
                        >
                            Add Bin
                        </Link>
                    </li>
                </ul>
            </nav>
            <Modal isOpened={isModalOpen} onClose={closeModal}>
                <DoDisturbOnIcon className="errorIcon" />
                <span> You are not authorized to add a bin.</span>
            </Modal>
        </>
       
    )
}

export default BinNav;
