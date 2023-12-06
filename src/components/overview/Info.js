import React from "react";
import { Clock } from "./TimeInfo";

import "../../styles/overview_css/Info.css";
// import { TrafficInformation } from "./TrafficInformation";
import { WeatherInfo } from "./WeatherInfo";

function Info() {
  return (
    <div className="info-container">
      <div className="info-box">

      </div>
      <div className="info-box">
        {/* <TrafficInformation /> */}
      </div>
      <div className="info-box">
        <WeatherInfo />
      </div>
      <div className="info-box">
        <Clock />
      </div>
    </div>
  );
}


export { Info };
