import React from "react";
import { Clock } from "./TimeInfo";

import "../../styles/overview_css/Info.css";
import { WeatherInfo } from "./WeatherInfo";
import { HumidityDisplay } from "./HumidityDisplay";

function Info() {
  return (
    <div className="info-container">
      <div className="info-box"></div>
      <div className="info-box">
        <HumidityDisplay />
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
