import { useEffect, useState } from "react";
import { useBins } from "../../contexts/BinContext";
import { useParams } from "react-router";
import { Spinner } from "../Spinner";
import BackButton from "./BackButton";
import "../../styles/Bin_css/Bin.css";
import { Button } from "@mui/material";

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

  // Accessing functions and data from BinContext
  const { getBin, currentBin, isLoading } = useBins();

  useEffect(() => {
    const fetchData = async () => {
      await getBin(id);
    };

    fetchData();
  }, [id, getBin]);

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
  } = currentBin;

  // Loading spinner while data is being fetched
  if (isLoading) {
    return <Spinner />;
  }

  //handle edit
  function handleEdit() {
    setIsDisabled(!isDisabled);
  }

  //handle save
  function handleSave(e) {}

  return (
    <div className="bin">
      {/* Displaying Bin Id */}
      <div className="row">
        <BinField
          className="binInput binInput_disabled"
          type="number"
          value={id}
          label={"Bin"}
        />
      </div>

      {/* Displaying Bin Capacity */}
      <div className="row">
        <BinField
          className={`binInput ${isDisabled ? "binInput_disabled" : ""}`}
          type="number"
          value={capacity}
          label={"Capacity"}
        />
      </div>

      {/* Displaying Device Id */}
      <div className="row">
        <BinField
          className="binInput binInput_disabled"
          value={deviceId}
          label={"Device Id"}
        />
      </div>

      {/* Displaying Fill Threshold */}
      <div className="row">
        <BinField
          className={`binInput ${isDisabled ? "binInput_disabled" : ""}`}
          value={`${fillThreshold}%`}
          label={"Fill Threshold"}
          disabled
        />
      </div>

      {/* Displaying Latitude and longitude */}
      <div className="row">
        <h6>Position</h6>
        <label htmlFor="lat">Latitude</label>
        <input
          id="lat"
          className={`binInput ${isDisabled ? "binInput_disabled" : ""}`}
          type="number"
          value={latitude}
        />
        <label htmlFor="lng">Longitude</label>
        <input
          id="lng"
          className={`binInput ${isDisabled ? "binInput_disabled" : ""}`}
          type="number"
          value={longitude}
        />
      </div>

      {/* Displaying Last Emptied Time */}
      <div className="row">
        <BinField
          className="binInput binInput_disabled"
          value={formatDate(emptiedLast || null)}
          label={"Last emptied on"}
        />
      </div>

      {/* Displaying Current Fill Level */}
      <div className="row">
        {/* value */}
        <BinField
          className="binInput binInput_disabled"
          value={`${
            fillLevels && fillLevels.length > 0
              ? fillLevels[fillLevels.length - 1].value
              : ""
          } %`}
          label={"Fill Level"}
        />

        {/* recorded on */}
        <BinField
          className="binInput binInput_disabled"
          value={`${
            fillLevels && fillLevels.length > 0
              ? formatDate(fillLevels[fillLevels.length - 1].dateTime || null)
              : ""
          }`}
          label={""}
        />
      </div>

      {/* Displaying Current Humidity */}
      <div className="row">
        {/* value */}
        <BinField
          className="binInput binInput_disabled"
          value={`${
            humidity && humidity.length > 0
              ? humidity[humidity.length - 1].value
              : ""
          }%`}
          label={"Humidity"}
        />

        {/* recorded on */}
        <BinField
          className="binInput binInput_disabled"
          value={`${
            humidity && humidity.length > 0
              ? formatDate(humidity[humidity.length - 1].dateTime || null)
              : ""
          }`}
          label={""}
        />
      </div>

      {/* Buttons for navigation and actions */}
      <div>
        <BackButton className={"btn"}>&larr; Back </BackButton>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleSave} disabled>
          Save
        </Button>
      </div>
    </div>
  );
}

function BinField({ value, label, className, type = "text" }) {
  return (
    <>
      <h6>{label}</h6>
      <input className={className} type={type} value={value} />
    </>
  );
}

export default Bin;
