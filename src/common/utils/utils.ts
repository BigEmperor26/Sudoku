export function currentFaceExtractor(currentAxis: string, xIndex: number, yIndex: number, zIndex: number, data: number[][][]): number[][] {
  if (currentAxis === 'x') {
    return data[xIndex];
  } else if (currentAxis === 'y') {
    const d = data.map((row) => row[yIndex]);
    // mirror on diagonal
    return d.map((_, i) => d.map((__, j) => d[j][i]));
  } else {
    const d = data.map((row) => row.map((col) => col[zIndex]));
    // mirror on diagonal
    return d.map((_, i) => d.map((__, j) => d[j][i]));
  }
}

export function mapRange(value: number, low1: number, high1: number, low2: number, high2: number): number {
  return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}
export function isCurrentFacce(currentAxis: string, xIndex: number, yIndex: number, zIndex: number, faceIndex: number): boolean {
  if (currentAxis === 'x') {
    return xIndex === faceIndex;
  } else if (currentAxis === 'y') {
    return yIndex === faceIndex;
  } else {
    return zIndex === faceIndex;
  }
}

export function getSlices(currentAxis: string, data: number[][][]): number[][][] {
  //return a list of slices according to the current axis
  if (currentAxis === 'x') {
    return Array.from({ length: 9 }, (_, i) => currentFaceExtractor(currentAxis, i, 0, 0, data));
  } else if (currentAxis === 'y') {
    return Array.from({ length: 9 }, (_, i) => currentFaceExtractor(currentAxis, 0, i, 0, data));
  } else {
    return Array.from({ length: 9 }, (_, i) => currentFaceExtractor(currentAxis, 0, 0, i, data));
  }
}

export function getSlicePositions(currentAxis: string, maxAxis: number, faceIndex: number): [number, number, number] {
  if (currentAxis === 'x') {
    // nomralize this number to be between -1 and 1
    return [mapRange(faceIndex + 1, 0, maxAxis, -0.5, 0.5), 0, 0];
  } else if (currentAxis === 'y') {
    return [0, -mapRange(faceIndex + 1, 0, maxAxis, -0.5, 0.5), 0];
  } else {
    return [0, 0, mapRange(faceIndex + 1, 0, maxAxis, -0.5, 0.5)];
  }
}
export function getRotation(currentAxis: string): [number, number, number] {
  if (currentAxis === 'x') {
    return [0, -Math.PI / 2, 0];
  } else if (currentAxis === 'y') {
    return [-Math.PI / 2, 0, 0];
  } else {
    return [0, 0, 0];
  }
}

export function map2Dto3D(row: number, col: number, currentAxis: string, xIndex: number, yIndex: number, zIndex: number): [number, number, number] {
  if (currentAxis === 'x') {
    return [xIndex, row, col];
  } else if (currentAxis === 'y') {
    return [col, yIndex, row];
  } else {
    // mirrow on diagonal
    return [col, row, zIndex];
  }
}

export function highlightHover(currentCell: [number, number], currentHover: [number, number] | null): boolean {
  if (currentHover === null) {
    return false;
  }
  /// check if same row
  if (currentCell[0] === currentHover[0]) {
    return true;
  }
  /// check if same column
  if (currentCell[1] === currentHover[1]) {
    return true;
  }
  // check if same plate
  const plateSize = 3;
  const plateX = Math.floor(currentCell[0] / plateSize);
  const plateY = Math.floor(currentCell[1] / plateSize);
  const hoverPlateX = Math.floor(currentHover[0] / plateSize);
  const hoverPlateY = Math.floor(currentHover[1] / plateSize);
  return plateX === hoverPlateX && plateY === hoverPlateY;
}

export function currentPossibleExtractor(
  currentAxis: string,
  xIndex: number,
  yIndex: number,
  zIndex: number,
  possible: number[][][][],
): number[][][] {
  if (currentAxis === 'x') {
    return possible[xIndex];
  } else if (currentAxis === 'y') {
    const d = possible.map((row) => row[yIndex]);
    // mirror on diagonal
    return d.map((_, i) => d.map((__, j) => d[j][i]));
  } else {
    const d = possible.map((row) => row.map((col) => col[zIndex]));
    // mirror on diagonal
    return d.map((_, i) => d.map((__, j) => d[j][i]));
  }
}
export function currentPossibleExtractorWrapper(currentAxis: string, index: number, possible: number[][][][]): number[][][] {
  if (currentAxis === 'x') {
    return currentPossibleExtractor(currentAxis, index, 0, 0, possible);
  } else if (currentAxis === 'y') {
    return currentPossibleExtractor(currentAxis, 0, index, 0, possible);
  } else {
    return currentPossibleExtractor(currentAxis, 0, 0, index, possible);
  }
}

export function getPossibleSlices(currentAxis: string, possible: number[][][][]): number[][][][] {
  //return a list of slices according to the current axis
  if (currentAxis === 'x') {
    return Array.from({ length: 9 }, (_, i) => currentPossibleExtractor(currentAxis, i, 0, 0, possible));
  } else if (currentAxis === 'y') {
    return Array.from({ length: 9 }, (_, i) => currentPossibleExtractor(currentAxis, 0, i, 0, possible));
  } else {
    return Array.from({ length: 9 }, (_, i) => currentPossibleExtractor(currentAxis, 0, 0, i, possible));
  }
}
export function stringToRGB(rgb: string): [number, number, number] {
  // Simple string
  const d = rgb
    .substring(4, rgb.length - 1)
    .replace(/ /g, '')
    .split(',');

  return [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
}

export function RGBToString(rgb: [number, number, number]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}
export function rgbaToString(rgba: [number, number, number, number]): string {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}
