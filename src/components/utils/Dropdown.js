import React from "react";

function Dropdown({ bins, selectedBin, handleBinChange }) {
  return (
    <div>
      <label>Select a Bin:</label>
      <select onChange={handleBinChange} value={selectedBin}>
        <option value={null}>Select a Bin</option>
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
