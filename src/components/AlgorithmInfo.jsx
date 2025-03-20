// src/components/AlgorithmInfo.jsx
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./AlgorithmInfo.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Complexity notation labels and numerical values for graph plotting
const COMPLEXITY_VALUES = {
  "O(1)": 0,
  "O(log n)": 0.5,
  "O(n)": 1,
  "O(n log n)": 2,
  "O(n²)": 3,
  "O(2^n)": 4,
  "O(n!)": 5,
};

// Function to convert complexity notation to numeric values for charts
const getComplexityValue = (notation) => COMPLEXITY_VALUES[notation] ?? 0;

// Algorithm descriptions for educational purposes
const ALGORITHM_DESCRIPTIONS = {
  bubbleSort: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Not suitable for large datasets.",
  mergeSort: "Merge Sort is a divide and conquer algorithm that divides the input array into two halves, recursively sorts them, then merges the sorted halves.",
  quickSort: "Quick Sort selects a 'pivot' element and partitions the array around it. Highly efficient for large datasets but with worst-case scenarios.",
  insertionSort: "Insertion Sort builds the final sorted array one item at a time. Good for small datasets or nearly sorted arrays.",
  selectionSort: "Selection Sort repeatedly finds the minimum element from the unsorted part and puts it at the beginning. Simple but inefficient for large lists.",
  heapSort: "Heap Sort converts the array into a heap data structure, and then repeatedly extracts the maximum element.",
  linearSort: "Linear sorting algorithms like Counting Sort, Radix Sort or Bucket Sort can achieve O(n) time complexity under specific conditions.",
};

// Expanded algorithm complexity data
const ALGORITHM_COMPLEXITY = {
  bubbleSort: {
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    description: ALGORITHM_DESCRIPTIONS.bubbleSort,
    useCases: "Small datasets, educational purposes, nearly sorted data",
    advantages: "Simple implementation, detects when the list is sorted",
    disadvantages: "Poor performance on large unsorted datasets"
  },
  mergeSort: {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(n)",
    description: ALGORITHM_DESCRIPTIONS.mergeSort,
    useCases: "Large datasets, stable sorting requirements",
    advantages: "Predictable performance, stable sort",
    disadvantages: "Requires additional memory space"
  },
  quickSort: {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    space: "O(log n)",
    description: ALGORITHM_DESCRIPTIONS.quickSort,
    useCases: "General purpose sorting, large datasets",
    advantages: "Fast average case, in-place partitioning",
    disadvantages: "Poor worst-case performance, unstable sort"
  },
  insertionSort: {
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    description: ALGORITHM_DESCRIPTIONS.insertionSort,
    useCases: "Small datasets, online algorithms (processing data as it arrives)",
    advantages: "Simple, efficient for small or nearly sorted data",
    disadvantages: "Inefficient on large datasets"
  },
  selectionSort: {
    time: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    description: ALGORITHM_DESCRIPTIONS.selectionSort,
    useCases: "Small datasets, minimizing memory writes",
    advantages: "Simple implementation, predictable performance",
    disadvantages: "Inefficient for all dataset sizes"
  },
  heapSort: {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(1)",
    description: ALGORITHM_DESCRIPTIONS.heapSort,
    useCases: "Large datasets, systems with memory constraints",
    advantages: "Guaranteed O(n log n) time, in-place sorting",
    disadvantages: "Unstable sort, typically slower than quicksort"
  },
  linearSort: {
    time: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    space: "O(n)",
    description: ALGORITHM_DESCRIPTIONS.linearSort,
    useCases: "Integer data with known range, distribution sorting",
    advantages: "Linear time complexity under certain conditions",
    disadvantages: "Limited to specific input types, often requires extra space"
  },
};

const AlgorithmInfo = ({ algorithm }) => {
  // Get complexity data for the selected algorithm
  const complexity = useMemo(() => 
    ALGORITHM_COMPLEXITY[algorithm] || {
      time: { best: "-", average: "-", worst: "-" },
      space: "-",
      description: "No information available for this algorithm.",
      useCases: "-",
      advantages: "-",
      disadvantages: "-"
    }, 
  [algorithm]);

  // Data for the graph
  const graphData = useMemo(() => ({
    labels: ["Best Case", "Average Case", "Worst Case"],
    datasets: [
      {
        label: "Time Complexity",
        data: [
          getComplexityValue(complexity.time.best),
          getComplexityValue(complexity.time.average),
          getComplexityValue(complexity.time.worst),
        ],
        backgroundColor: ["#4BC0C0", "#36A2EB", "#FF6384"],
        borderColor: ["#3DA8A8", "#2B88CA", "#E5566F"],
        borderWidth: 1,
      },
    ],
  }), [complexity]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${algorithm} Time Complexity Comparison`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const complexityLabels = Object.entries(COMPLEXITY_VALUES);
            const match = complexityLabels.find(([_, val]) => val === value);
            return match ? match[0] : "Unknown";
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5.5,
        title: {
          display: true,
          text: 'Complexity'
        },
        ticks: {
          callback: (value) => {
            const complexityLabels = Object.entries(COMPLEXITY_VALUES);
            const match = complexityLabels.find(([_, val]) => val === value);
            return match ? match[0] : "";
          },
          stepSize: 1
        },
      },
    },
  }), [algorithm]);

  return (
    <div className="algorithm-info">
      <h2>{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Analysis</h2>
      
      <div className="algorithm-description">
        <p>{complexity.description}</p>
      </div>
      
      <div className="complexity-details">
        <h3>Time Complexity</h3>
        <p>
          <strong>Best Case:</strong> {complexity.time.best}
        </p>
        <p>
          <strong>Average Case:</strong> {complexity.time.average}
        </p>
        <p>
          <strong>Worst Case:</strong> {complexity.time.worst}
        </p>
        <h3>Space Complexity</h3>
        <p>{complexity.space}</p>
      </div>
      
      <div className="complexity-graph" style={{ height: "300px" }}>
        <Bar data={graphData} options={chartOptions} />
      </div>
      
      <div className="algorithm-properties">
        <h3>Practical Information</h3>
        <div className="property">
          <strong>Best Used For:</strong>
          <p>{complexity.useCases}</p>
        </div>
        <div className="property">
          <strong>Advantages:</strong>
          <p>{complexity.advantages}</p>
        </div>
        <div className="property">
          <strong>Disadvantages:</strong>
          <p>{complexity.disadvantages}</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;