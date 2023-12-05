import React from "react";

import "../../styles/overview_css/Info.css";
import { TrafficInformation } from "./TrafficInformation";

function Info() {
  return (
    <div className="info-container">
      <div className="info-box">
        <PlaceHolder />
      </div>
      <div className="info-box">
        <TrafficInformation />
      </div>
      <div className="info-box">
        <Weather />
      </div>
      <div className="info-box">
        <CurrentTime />
      </div>
    </div>
  );
}

function Weather() {
  return (
    <>
      <p>Weather</p>
    </>
  );
}

function CurrentTime() {
  return <>Current Time</>;
}

function PlaceHolder() {
  return <>Placeholder (Andreea)</>;
}

export { Info };
