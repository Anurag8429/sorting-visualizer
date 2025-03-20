// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
import Controls from "./components/Controls";
import AlgorithmInfo from "./components/AlgorithmInfo"; // Import the new component
import {
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  selectionSort,
  heapSort,
  linearSort,
} from "./algorithms/sortingAlgorithms";
import "./App.css";

const App = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState("Fast (Default)");
  const [arraySize, setArraySize] = useState(20);
  const [barColor, setBarColor] = useState("blue ");
  const [comparisonColor, setComparisonColor] = useState("red");
  const [sortedColor, setSortedColor] = useState("green");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(""); // Track selected algorithm
  const [isSorted, setIsSorted] = useState(false); // Track if the array is sorted
  const sortingRef = useRef(false);

  // Generate a new random array
  const generateNewArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setIsSorted(false); // Reset sorted state
  };

  // Check if the array is already sorted
  const isArraySorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        return false;
      }
    }
    return true;
  };

  // Handle algorithm selection and sorting
  const handleAlgorithmChange = async (algorithm) => {
    if (!algorithm || isSorting) return;

    // Set the selected algorithm
    setSelectedAlgorithm(algorithm);

    // Check if the array is already sorted
    if (isArraySorted(array)) {
      alert("The array is already sorted!");
      return;
    }

    setIsSorting(true);
    sortingRef.current = true;

    // Map speed options to delay values
    const speedMap = {
      "Very Fast": 50,
      "Fast (Default)": 100,
      Normal: 300,
      Slow: 600,
      "Very Slow": 1000,
    };

    const delay = speedMap[speed] || 100; // Default to 100ms if speed is not found

    switch (algorithm) {
      case "bubbleSort":
        await bubbleSort(array, setArray, delay, comparisonColor, barColor, sortedColor, sortingRef);
        break;
      case "mergeSort":
        await mergeSort(array, setArray, delay, comparisonColor, barColor, sortedColor, sortingRef);
        break;
      case "quickSort":
        await quickSort(array, setArray, delay, comparisonColor, barColor, sortedColor, sortingRef);
        break;
      case "insertionSort":
        await insertionSort(array, setArray, delay, comparisonColor, barColor, sortedColor, sortingRef);
        break;
      case "selectionSort":
        await selectionSort(array, setArray, delay, comparisonColor, barColor, sortedColor, sortingRef);
        break;
      case "heapSort":
        await heapSort(array, setArray, delay, comparisonColor, barColor, sortedColor, sortingRef);
        break;
      case "linearSort":
        await linearSort(array, setArray, delay, comparisonColor, barColor, sortedColor, sortingRef);
        break;
      default:
        break;
    }

    setIsSorting(false);
    sortingRef.current = false;
    setIsSorted(true); // Mark the array as sorted
  };

  // Stop sorting
  const stopSorting = () => {
    sortingRef.current = false;
    setIsSorting(false);
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Render the array as bars with numeric values
  const renderArray = () => {
    return array.map((value, index) => (
      <div
        key={index}
        className="array-bar"
        style={{
          height: `${value}%`,
          backgroundColor: isSorted ? sortedColor : barColor, // Use sortedColor if array is sorted
        }}
      >
        <span
          className="bar-value"
          style={{
            fontSize: `${Math.max(10, value * 0.3)}px`,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          {value}
        </span>
      </div>
    ));
  };

  // Generate a new array when the component mounts or arraySize changes
  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "🌞" : "🌙"}
      </button>
      <h1>Sorting Algorithm Visualizer</h1>
      <Controls
        generateNewArray={generateNewArray}
        handleAlgorithmChange={(e) => {
          setSelectedAlgorithm(e.target.value); // Update selected algorithm
          handleAlgorithmChange(e.target.value);
        }}
        handleSort={() => {
          const algorithm = document.querySelector("select").value;
          handleAlgorithmChange(algorithm);
        }}
        stopSorting={stopSorting}
        isSorting={isSorting}
        speed={speed}
        setSpeed={setSpeed}
        arraySize={arraySize}
        setArraySize={setArraySize}
        barColor={barColor}
        setBarColor={setBarColor}
        comparisonColor={comparisonColor}
        setComparisonColor={setComparisonColor}
        sortedColor={sortedColor}
        setSortedColor={setSortedColor}
      />
      <div className="array-container">{renderArray()}</div>

      {/* Display AlgorithmInfo component when an algorithm is selected */}
      {selectedAlgorithm && <AlgorithmInfo algorithm={selectedAlgorithm} />}
    </div>
  );
};

export default App;