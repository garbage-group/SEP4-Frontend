import { createPortal } from "react-dom";

import "../../styles/utils_css/Modal.css";
import {Button} from "./Button";

const Modal = ({ isOpened, onClose, children }) => {
  if (!isOpened) return null;

  return createPortal(
    <div>
      <div className="overlay"></div>
      <div className="popUpContent">
        <div className="popUpText">{children}</div>

        <Button className="closeButton" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
