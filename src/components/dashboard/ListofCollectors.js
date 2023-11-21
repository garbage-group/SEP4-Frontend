import React from "react";
import "../../styles/dashboard_css/ListOfCollectors.css";

export function ListOfCollectors() {
  return (
    <div className="info-container">
      <div className="title-info">
        <p className="list-text">Garbage Collectors</p>
        <p to="/collectors" className="allworkers-text">
          View All Workers
        </p>
      </div>
    </div>
  );
}
