import React from "react";
import "../../styles/utils_css/Dropdown.css"

function Dropdown({ bins, selectedBin, handleBinChange }) {
  return (
    <div className="dropdown">
      <label>Select a Bin:</label>
      <select onChange={handleBinChange} value={selectedBin} >
        <option className="dropdownSelect" value={null}>Select a Bin</option>
        {bins.map((bin) => (
          <option key={bin.id} value={bin.id}>
            Bin {bin.id}
          </option>
        ))}
      </select>
    </div>
  );
}

export { Dropdown };
