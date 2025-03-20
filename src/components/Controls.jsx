import React from "react";
import { FaRandom, FaPlay, FaStop, FaSync } from "react-icons/fa";

const Controls = ({
  generateNewArray,
  handleAlgorithmChange,
  handleSort,
  stopSorting,
  isSorting,
  speed,
  setSpeed,
  arraySize,
  setArraySize,
  barColor,
  setBarColor,
  comparisonColor,
  setComparisonColor,
  sortedColor,
  setSortedColor,
}) => {
  const speedOptions = ["Very Fast", "Fast (Default)", "Normal", "Slow", "Very Slow"];
  const arraySizeOptions = ["10", "15", "20", "25", "30", "35", "40", "45", "50"];
  const barColors = ["blue", "cyan", "green", "pink", "red", "yellow", "purple", "orange", "teal"];
  const comparisonColors = ["red", "orange", "purple", "cyan", "pink", "teal", "yellow", "green", "blue"];
  const sortedColors = ["green", "lime", "teal", "cyan", "blue", "purple", "pink", "orange", "yellow"];

  return (
    <div className="controls">
      {/* Dropdowns in one row */}
      <div className="dropdowns-container">
        <div className="control-group">
          <label>Algorithm</label>
          <select disabled={isSorting}>
            <option value="" disabled>
              Select Algorithm
            </option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="heapSort">Heap Sort</option>
            <option value="linearSort">Linear Sort</option>
          </select>
        </div>

        <div className="control-group">
          <label>Speed of Visualization</label>
          <select value={speed} onChange={(e) => setSpeed(e.target.value)} disabled={isSorting}>
            <option value="" disabled>
              Select Speed
            </option>
            {speedOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Size of the Array</label>
          <select value={arraySize} onChange={(e) => setArraySize(e.target.value)} disabled={isSorting}>
            <option value="" disabled>
              Select Size
            </option>
            {arraySizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Color of Bars</label>
          <select value={barColor} onChange={(e) => setBarColor(e.target.value)} disabled={isSorting}>
            <option value="" disabled>
              Select Bar Color
            </option>
            {barColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Color of Comparisons</label>
          <select value={comparisonColor} onChange={(e) => setComparisonColor(e.target.value)} disabled={isSorting}>
            <option value="" disabled>
              Select Comparison Color
            </option>
            {comparisonColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Color of Sorted Elements</label>
          <select value={sortedColor} onChange={(e) => setSortedColor(e.target.value)} disabled={isSorting}>
            <option value="" disabled>
              Select Sorted Color
            </option>
            {sortedColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons in one row */}
      <div className="buttons-container">
        <button onClick={generateNewArray} disabled={isSorting} aria-label="Generate new array">
          <FaRandom /> New Array
        </button>
        <button onClick={handleSort} disabled={isSorting} aria-label="Start sorting">
          <FaPlay /> Sort
        </button>
        <button onClick={stopSorting} disabled={!isSorting} aria-label="Stop sorting">
          <FaStop /> Stop
        </button>
        <button onClick={generateNewArray} disabled={isSorting} aria-label="Reset array">
          <FaSync /> Reset
        </button>
      </div>
    </div>
  );
};

export default Controls;