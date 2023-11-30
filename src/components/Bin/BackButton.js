import { useNavigate } from "react-router-dom";
import "../../styles/Bin_css/BackButton.css"

function BackButton() {
    const navigate = useNavigate();
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
                {
                    /*This will navigate to 1 history back in url */
                }
            }}
            className="btn back"
        >
            &larr; Back
        </button>
    );
}

export default BackButton
