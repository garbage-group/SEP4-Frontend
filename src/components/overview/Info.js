import React from "react";

import { Clock } from "./TimeInfo";
import { LatestNews } from "../overview/LatestNews"
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { WeatherInfo } from "./WeatherInfo";
import { HumidityDisplay } from "./HumidityDisplay";
import "../../styles/overview_css/Info.css";
import "../../styles/overview_css/News.css"

function Info() {
  return (
    <div className="info-container">
      <div id="first-info-box" className="info-box">
        <MusicNoteIcon className="music-note-icon" />
        <div className="music-title">Music for You</div>
        <MusicNoteIcon className="music-note-icon" />
        <div id="music-container" className="music-container">
          <LatestNews />
        </div>
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

