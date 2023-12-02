import React from "react";
import "../styles/overview_css/Overview.css";
import { Info } from "../components/overview/Info";
import { ListOfCollectors } from "../components/overview/ListofCollectors";
import { Map } from "../components/overview/MapOverview";

export function Overview() {
  return (
    <div className="overview-container">
      <Info />

      <div className="map-list-container">
        <div className="map-placeholder">
          <Map />
        </div>
        <ListOfCollectors />
      </div>
    </div>
  );
}
