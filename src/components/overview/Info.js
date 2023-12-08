import React from "react";

import "../../styles/overview_css/Info.css";
import "../../styles/overview_css/News.css"
import { LatestNews } from "../overview/LatestNews"
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export function Info() {
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
      <div className="info-box"></div>
      <div className="info-box"></div>
    </div>
  );
}