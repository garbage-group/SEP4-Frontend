import React from "react";

import { Info } from "./overview/Info";
import { ListOfCollectors } from "./overview/ListofCollectors";

import "../styles/overview_css/Overview.css";

export function Overview() {
  return (
    <div className="overview-container">
      <Info />

      <div className="map-list-container">
        <div className="map-placeholder"></div>
        <ListOfCollectors />
      </div>
    </div>
  );
}
