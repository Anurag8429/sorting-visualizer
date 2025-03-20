import React from "react";
import "./ArrayVisualizer.css";

const ArrayVisualizer = ({ array, barColor, comparisonColor, sortedColor, theme }) => {
  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            height: `${value}%`,
            backgroundColor: barColor.toLowerCase(),
          }}
        >
          <span className={`bar-value ${theme}`}>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default ArrayVisualizer;