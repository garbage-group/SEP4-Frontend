import "../../styles/Bin_css/BinItem.css";
import { useBins } from "../../contexts/BinContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function BinItem({ bin }) {
  const { currentBin, deleteBin } = useBins();
  const { id, emptiedLast, capacity, latitude, longitude } = bin;

  function handleDelete(e) {
    e.preventDefault();
    deleteBin(id);
  }

  return (
    <li>
      <Link
        className={`binItem ${id === currentBin.id ? "binItem--active" : ""}`}
        to={`${id}?lat=${latitude}&lng=${longitude}`}
      >
        <span className="emoji">{<DeleteIcon />}</span>
        <h3 className="name">
          Bin {id} <span>(Capacity: {capacity})</span>
        </h3>

        <time className="date">
          <div>
            <p>Last emptied: </p>
            {emptiedLast ? (
              formatDate(emptiedLast)
            ) : (
              <span className="na">N/A</span>
            )}
          </div>
        </time>
        <button className="deleteBtn" onClick={handleDelete} data-testid="deleteBin">
          &times;
        </button>
      </Link>
    </li>
  );
}

export default BinItem;
