import { useEffect, useState } from "react";
import { useBins } from "../../contexts/BinContext";
import { useParams } from "react-router";
import BackButton from "./BackButton";
import "../../styles/Bin_css/Bin.css";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "../utils/Button";
import Modal from "../utils/Modal";
import {Spinner} from "../utils/Spinner";

// Function to format date in a readable format
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Bin() {
  // Extracting bin ID from URL params
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));
  const [message, setMessage] = useState("");

  // Accessing functions and data from BinContext
  const { getBin, updateBin, currentBin, isLoading, activateBuzzer } =
    useBins();

  //extracting data from bin object;
  const {
    deviceId,
    capacity,
    emptiedLast,
    fillThreshold,
    latitude,
    longitude,
    fillLevels,
    humidity,
    status,
    pickUpTime,
  } = currentBin;

  const [newFIllThreshold, setNewFillThreshold] = useState(
    currentBin.fillThreshold
  );
  const [newLatitude, setNewLatitude] = useState(currentBin.latitude);
  const [newLongitude, setNewLongitude] = useState(currentBin.longitude);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showModal = (message) =>{
    setMessage(message);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchData = async () => {
        await getBin(id);
      };
      fetchData();
    }

    // Check if currentBin is available before setting initial state values
    if (currentBin) {
      setNewFillThreshold(currentBin.fillThreshold ?? 0);
      setNewLatitude(currentBin.latitude ?? 0);
      setNewLongitude(currentBin.longitude ?? 0);
    }
  }, [id, getBin, currentBin, isAuthenticated, token]);

  // Loading spinner while data is being fetched
  if (isLoading) {
    return <Spinner />;
  }

  //handle edit
  function handleEdit() {
    setIsDisabled(!isDisabled);
  }

  //handle save
  function handleSave() {
    const isValidFillThreshold =
      newFIllThreshold >= 0 && newFIllThreshold <= 100;
    const isValidLatitude = newLatitude >= -90 && newLatitude <= 90;
    const isValidLongitude = newLongitude >= -180 && newLongitude <= 180;

    if (!isValidFillThreshold) {
      // Handle invalid fill threshold
      console.error(
        "Invalid fill threshold. Please enter a value between 0 and 100."
      );
      return;
    }

    if (!isValidLatitude) {
      // Handle invalid latitude
      console.error(
        "Invalid latitude. Please enter a value between -90 and 90."
      );
      return;
    }

    if (!isValidLongitude) {
      // Handle invalid longitude
      console.error(
        "Invalid longitude. Please enter a value between -180 and 180."
      );
      return;
    }

    const updatedBin = {
      id,
      newFIllThreshold,
      newLatitude,
      newLongitude,
    };

    updateBin(id, updatedBin);
    showModal(
      <>
        <div className="savedImage">
          <img src={require("../../images/popUp/tick.gif")} alt="" />
        </div>
        <span>Data Updated</span>
      </>
    );
  }

  //buzzer
  const handleBuzzer = async () => {
    await activateBuzzer(id);
    showModal("Request has been sent.")
  };

  return (
    <>
      <Modal isOpened={isModalOpen} onClose={closeModal}>
      {message}
      </Modal>

      <div className="bin">
        {/* Displaying Bin Id */}
        <div className="row">
          <h6>Bin</h6>
          <input
            className="binInput binInput_disabled"
            type="number"
            value={id}
            data-testid="binId"
            readOnly
          />
        </div>

        {/* Displaying Device Id */}
        <div className="row">
          <h6>Device Id</h6>
          <input
            className="binInput binInput_disabled"
            value={deviceId}
            data-testid="deviceId"
            readOnly
          />
        </div>

        {/* Displaying Bin Capacity */}
        <div className="row">
          <h6>Device Status</h6>
          <label className="status">
            {status === "ACTIVE" ? (
              <span>
                Active <CheckCircleIcon className="active" />
              </span>
            ) : status === "INACTIVE" ? (
              <span>
                OFFLINE <CircleIcon className="offline" />
              </span>
            ) : (
              <span>
                DEFECT <ErrorIcon className="defect" />
              </span>
            )}
          </label>
        </div>

        {/* Displaying Bin Capacity */}
        <div className="row">
          <h6>Capacity(Liter)</h6>
          <input
            className={"binInput binInput_disabled"}
            value={capacity}
            data-testid="capacity"
            readOnly
          />
        </div>

        {/* Displaying Fill Threshold */}
        <div className="row">
          <h6>Fill Threshold</h6>
          <input
            className={`binInput ${isDisabled ? "binInput_disabled" : ""}`}
            value={`${isDisabled ? fillThreshold : newFIllThreshold}`}
            onChange={(e) => setNewFillThreshold(e.target.value)}
            data-testid="Fill Threshold"
          />
        </div>

        {/* Displaying Last Emptied Time */}
        <div className="row">
          <h6>Last emptied on</h6>
          <input
            className="binInput binInput_disabled"
            value={emptiedLast ? formatDate(emptiedLast) : "N/A"}
            data-testid="emptiedLast"
            readOnly
          />
        </div>

        {/* Displaying Next Pick Up Time */}
        <div className="row">
          <h6>Next pick up on</h6>
          <input
            className="binInput binInput_disabled"
            value={pickUpTime ? formatDate(pickUpTime) : "N/A"}
            data-testid="emptiedLast"
            readOnly
          />
        </div>

        {/* Displaying Current Fill Level */}
        <div className="row">
          <h6>Fill Level</h6>

          {fillLevels && fillLevels.length > 0 && (
            <>
              <input
                className="binInput binInput_disabled"
                value={`${fillLevels[fillLevels.length - 1].value}%`}
                data-testid="fillLevel"
                readOnly
              />

              <input
                className="binInput binInput_disabled"
                value={`${formatDate(
                  fillLevels[fillLevels.length - 1].dateTime || null
                )}`}
                data-testid="fillDate"
                readOnly
              />
            </>
          )}
        </div>

        {/* Displaying Current Humidity */}
        <div className="row">
          <h6>Humidity</h6>
          {humidity && humidity.length > 0 && (
            <>
              <input
                className="binInput binInput_disabled"
                value={`${humidity[humidity.length - 1].value}%`}
                data-testid="humidity"
                readOnly
              />
              <input
                className="binInput binInput_disabled"
                value={`${formatDate(
                  humidity[humidity.length - 1].dateTime || null
                )}`}
                readOnly
              />
            </>
          )}
        </div>

        {/* Displaying Latitude and longitude */}
        <div className="row">
          <h6>Position</h6>
          <label htmlFor="lat">Latitude</label>
          <input
            id="lat"
            className={`binInput ${isDisabled ? "binInput_disabled" : ""}`}
            type="number"
            value={`${isDisabled ? latitude : newLatitude}`}
            onChange={(e) => setNewLatitude(e.target.value)}
            data-testid="Latitude"
          />
          <label htmlFor="lng">Longitude</label>
          <input
            id="lng"
            className={`binInput ${isDisabled ? "binInput_disabled" : ""}`}
            type="number"
            value={`${isDisabled ? longitude : newLongitude}`}
            onChange={(e) => setNewLongitude(e.target.value)}
            data-testid="Longitude"
          />
        </div>

        {/* Buttons for navigation and actions */}
        <div className="buttons-container">
          <BackButton className={"btn"}>&larr; Back </BackButton>

          <Button onClick={handleEdit} className="btn">
            Edit
          </Button>
          <Button
            onClick={handleSave}
            className={`btn  ${isDisabled ? "editbutton_disabled" : ""}`}
          >
            Save
          </Button>

          <Button onClick={handleBuzzer} className="btn">
            Buzzer
          </Button>
        </div>
      </div>
    </>
  );
}

export default Bin;
