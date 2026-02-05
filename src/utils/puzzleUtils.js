/**
 * Puzzle utility functions
 */

/**
 * Creates an array of tiles with their initial positions
 * @param {number} gridSize - Number of rows/columns
 * @param {number} imageSize - Size of the full image in pixels
 * @returns {Array} Array of tile objects with id and position
 */
export const createTiles = (gridSize, imageSize = 600) => {
  const tileSize = imageSize / gridSize;
  const tiles = [];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const xOffset = -col * tileSize;
      const yOffset = -row * tileSize;

      tiles.push({
        id: `${row}-${col}`,
        position: `${xOffset}px ${yOffset}px`,
      });
    }
  }

  return tiles;
};

/**
 * Shuffles an array of positions, ensuring the result is different from the original
 * @param {Array} positions - Array of position strings
 * @returns {Array} Shuffled array of positions
 */
export const shufflePositions = (positions) => {
  let shuffled;

  do {
    shuffled = [...positions].sort(() => Math.random() - 0.5);
  } while (shuffled.every((pos, idx) => pos === positions[idx]));

  return shuffled;
};

/**
 * Checks if the puzzle is solved by comparing current positions to original
 * @param {Array} tiles - Current tile array
 * @param {Array} originalPositions - Array of original position strings
 * @returns {boolean} True if puzzle is solved
 */
export const checkIsSolved = (tiles, originalPositions) => {
  return tiles.every(
    (tile, index) => tile.position === originalPositions[index],
  );
};

/**
 * Finds all tiles that are not in their correct position
 * @param {Array} tiles - Current tile array
 * @param {Array} originalPositions - Array of original position strings
 * @returns {Array} Array of objects with index, currentPosition, and correctPosition
 */
export const findMisplacedTiles = (tiles, originalPositions) => {
  return tiles
    .map((tile, index) => ({
      index,
      currentPosition: tile.position,
      correctPosition: originalPositions[index],
    }))
    .filter((t) => t.currentPosition !== t.correctPosition);
};

/**
 * Finds a hint pair (source tile to move and destination slot where it belongs)
 * @param {Array} tiles - Current tile array
 * @param {Array} originalPositions - Array of original position strings
 * @returns {Object|null} Object with sourceIndex and destinationIndex, or null if solved
 *
 * sourceIndex      – the slot where the misplaced tile currently sits
 * destinationIndex – the slot where that tile belongs (its home in the solved state)
 *
 * After the swap, the source tile will be in its correct final position.
 */
export const findHintPair = (tiles, originalPositions) => {
  const misplaced = findMisplacedTiles(tiles, originalPositions);

  if (misplaced.length === 0) return null;

  // Pick a random misplaced tile as the source
  const source = misplaced[Math.floor(Math.random() * misplaced.length)];

  // Find the slot index that owns this position in the solved state.
  // This is the home slot for the source tile — where it needs to go.
  const destinationIndex = originalPositions.indexOf(source.currentPosition);

  console.log("from:", source.index);
  console.log("to:", destinationIndex);
  return {
    sourceIndex: source.index,
    destinationIndex,
  };
};

/**
 * Swaps the positions of two tiles
 * @param {Array} tiles - Current tile array
 * @param {number} indexA - Index of first tile
 * @param {number} indexB - Index of second tile
 * @returns {Array} New tile array with swapped positions
 */
export const swapTilePositions = (tiles, indexA, indexB) => {
  const newTiles = [...tiles];
  const temp = newTiles[indexA].position;
  newTiles[indexA] = {
    ...newTiles[indexA],
    position: newTiles[indexB].position,
  };
  newTiles[indexB] = { ...newTiles[indexB], position: temp };
  return newTiles;
};

/**
 * Applies shuffled positions to tiles
 * @param {Array} tiles - Current tile array
 * @param {Array} shuffledPositions - Array of shuffled position strings
 * @returns {Array} New tile array with shuffled positions
 */
export const applyShuffledPositions = (tiles, shuffledPositions) => {
  return tiles.map((tile, index) => ({
    ...tile,
    position: shuffledPositions[index],
  }));
};

/**
 * Resets tiles to their original positions
 * @param {Array} tiles - Current tile array
 * @param {Array} originalPositions - Array of original position strings
 * @returns {Array} New tile array with original positions
 */
export const resetTilePositions = (tiles, originalPositions) => {
  return tiles.map((tile, index) => ({
    ...tile,
    position: originalPositions[index],
  }));
};
