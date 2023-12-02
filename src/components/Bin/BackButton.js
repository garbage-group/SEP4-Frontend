import { useNavigate } from "react-router-dom";
import "../../styles/Bin_css/BackButton.css";

function BackButton({ children, className }) {
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
      className={className}
    >
      {children}
    </button>
  );
}

export default BackButton;
