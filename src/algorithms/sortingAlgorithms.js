// Utility function to add delays
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to update bar colors
const updateBarColors = (indices, color) => {
  const bars = document.querySelectorAll(".array-bar");
  indices.forEach((index) => {
    if (bars[index]) {
      bars[index].style.backgroundColor = color;
    }
  });
};

// Bubble Sort
export const bubbleSort = async (array, updateArray, speed, comparisonColor, barColor, sortedColor, sortingRef) => {
  const n = array.length;
  for (let i = 0; i < n - 1 && sortingRef.current; i++) {
    for (let j = 0; j < n - i - 1 && sortingRef.current; j++) {
      // Highlight elements being compared
      updateBarColors([j, j + 1], comparisonColor);
      await sleep(speed);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        updateArray([...array]);
      }

      // Revert colors after comparison
      updateBarColors([j, j + 1], barColor);
    }

    // Highlight sorted elements
    updateBarColors([n - i - 1], sortedColor);
  }

  // Ensure all bars have the user-selected bar color after sorting
  updateBarColors(Array.from({ length: array.length }, (_, i) => i), barColor);
};

// Merge Sort
export const mergeSort = async (array, updateArray, speed, comparisonColor, barColor, sortedColor, sortingRef) => {
  const merge = async (arr, left, mid, right) => {
    const temp = [];
    let i = left,
      j = mid + 1;

    while (i <= mid && j <= right) {
      // Highlight elements being compared
      updateBarColors([i, j], comparisonColor);
      await sleep(speed);

      if (arr[i] <= arr[j]) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
      }

      // Revert colors after comparison
      updateBarColors([i - 1, j - 1], barColor);
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let i = left; i <= right; i++) {
      arr[i] = temp[i - left];
      updateArray([...arr]);
      await sleep(speed);

      // Highlight sorted elements
      updateBarColors([i], sortedColor);
    }
  };

  const sort = async (arr, left, right) => {
    if (left < right && sortingRef.current) {
      const mid = Math.floor((left + right) / 2);
      await sort(arr, left, mid);
      await sort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  await sort(array, 0, array.length - 1);

  // Ensure all bars have the user-selected bar color after sorting
  updateBarColors(Array.from({ length: array.length }, (_, i) => i), barColor);
};

// Quick Sort
export const quickSort = async (array, updateArray, speed, comparisonColor, barColor, sortedColor, sortingRef) => {
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high && sortingRef.current; j++) {
      // Highlight elements being compared
      updateBarColors([j, high], comparisonColor);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        updateArray([...arr]);
      }

      // Revert colors after comparison
      updateBarColors([j, high], barColor);
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    updateArray([...arr]);
    await sleep(speed);

    // Highlight sorted elements
    updateBarColors([i + 1], sortedColor);

    return i + 1;
  };

  const sort = async (arr, low, high) => {
    if (low < high && sortingRef.current) {
      const pi = await partition(arr, low, high);
      await sort(arr, low, pi - 1);
      await sort(arr, pi + 1, high);
    }
  };

  await sort(array, 0, array.length - 1);

  // Ensure all bars have the user-selected bar color after sorting
  updateBarColors(Array.from({ length: array.length }, (_, i) => i), barColor);
};

// Insertion Sort
export const insertionSort = async (array, updateArray, speed, comparisonColor, barColor, sortedColor, sortingRef) => {
  const n = array.length;
  for (let i = 1; i < n && sortingRef.current; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key && sortingRef.current) {
      // Highlight elements being compared
      updateBarColors([j, j + 1], comparisonColor);
      await sleep(speed);

      array[j + 1] = array[j];
      updateArray([...array]);

      // Revert colors after comparison
      updateBarColors([j, j + 1], barColor);

      j--;
    }

    array[j + 1] = key;
    updateArray([...array]);
    await sleep(speed);

    // Highlight sorted elements
    updateBarColors([j + 1], sortedColor);
  }

  // Ensure all bars have the user-selected bar color after sorting
  updateBarColors(Array.from({ length: array.length }, (_, i) => i), barColor);
};

// Selection Sort
export const selectionSort = async (array, updateArray, speed, comparisonColor, barColor, sortedColor, sortingRef) => {
  const n = array.length;
  for (let i = 0; i < n - 1 && sortingRef.current; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n && sortingRef.current; j++) {
      // Highlight elements being compared
      updateBarColors([j, minIndex], comparisonColor);
      await sleep(speed);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }

      // Revert colors after comparison
      updateBarColors([j, minIndex], barColor);
    }

    if (minIndex !== i && sortingRef.current) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      updateArray([...array]);
      await sleep(speed);
    }

    // Highlight sorted elements
    updateBarColors([i], sortedColor);
  }

  // Ensure all bars have the user-selected bar color after sorting
  updateBarColors(Array.from({ length: array.length }, (_, i) => i), barColor);
};

// Heap Sort
export const heapSort = async (array, updateArray, speed, comparisonColor, barColor, sortedColor, sortingRef) => {
  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i && sortingRef.current) {
      // Highlight elements being compared
      updateBarColors([i, largest], comparisonColor);
      await sleep(speed);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      updateArray([...arr]);

      // Revert colors after comparison
      updateBarColors([i, largest], barColor);

      await heapify(arr, n, largest);
    }
  };

  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0 && sortingRef.current; i--) {
    await heapify(array, n, i);
  }

  for (let i = n - 1; i > 0 && sortingRef.current; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    updateArray([...array]);
    await sleep(speed);

    // Highlight sorted elements
    updateBarColors([i], sortedColor);

    await heapify(array, i, 0);
  }

  // Ensure all bars have the user-selected bar color after sorting
  updateBarColors(Array.from({ length: array.length }, (_, i) => i), barColor);
};

// Linear Sort (Counting Sort for simplicity)
export const linearSort = async (array, updateArray, speed, comparisonColor, barColor, sortedColor, sortingRef) => {
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(array.length).fill(0);

  for (let i = 0; i < array.length && sortingRef.current; i++) {
    count[array[i] - min]++;
  }

  for (let i = 1; i < count.length && sortingRef.current; i++) {
    count[i] += count[i - 1];
  }

  for (let i = array.length - 1; i >= 0 && sortingRef.current; i--) {
    output[count[array[i] - min] - 1] = array[i];
    count[array[i] - min]--;
    updateArray([...output]);
    await sleep(speed);

    // Highlight sorted elements
    updateBarColors([count[array[i] - min]], sortedColor);
  }

  for (let i = 0; i < array.length && sortingRef.current; i++) {
    array[i] = output[i];
    updateArray([...array]);
    await sleep(speed);
  }

  // Ensure all bars have the user-selected bar color after sorting
  updateBarColors(Array.from({ length: array.length }, (_, i) => i), barColor);
};