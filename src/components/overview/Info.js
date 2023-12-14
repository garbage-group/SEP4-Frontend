import React from "react";

import { Clock } from "./TimeInfo";

import { WeatherInfo } from "./WeatherInfo";
import { HumidityDisplay } from "./HumidityDisplay";
import "../../styles/overview_css/Info.css";
// import "../../styles/overview_css/News.css"
import { TopHumidityBins } from "./TopHumidity";

function Info() {
  return (
    <div className="info-container">
       <div className="info-box">
        <TopHumidityBins />
      </div>
      <div className="info-box"><HumidityDisplay /></div>
      <div className="info-box"> <WeatherInfo /></div>
     <div className="info-box">
        <Clock />
      </div>
    </div>
  );
}

export { Info };

