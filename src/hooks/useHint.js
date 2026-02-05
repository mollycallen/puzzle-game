import { useState, useRef, useCallback, useEffect } from "react";
import { findHintPair } from "../utils/puzzleUtils";

const DEFAULT_HINT_DURATION = 2500;

/**
 * Hook to manage puzzle hint functionality
 * @param {Object} options - Configuration options
 * @param {number} options.duration - How long hints display in ms (default: 2500)
 * @returns {Object} Hint state and controls
 */
export const useHint = (options = {}) => {
  const { duration = DEFAULT_HINT_DURATION } = options;

  const [hintSource, setHintSource] = useState(null);
  const [hintDestination, setHintDestination] = useState(null);
  const timeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /**
   * Clear all hints
   */
  const clearHints = useCallback(() => {
    setHintSource(null);
    setHintDestination(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  /**
   * Show a hint for the given tiles
   * @param {Array} tiles - Current tile array
   * @param {Array} originalPositions - Array of original position strings
   * @returns {boolean} True if hint was shown, false if puzzle is solved
   */
  const showHint = useCallback(
    (tiles, originalPositions) => {
      // Clear any existing hints first
      clearHints();

      const hintPair = findHintPair(tiles, originalPositions);

      if (!hintPair) {
        return false; // Puzzle is solved, no hints to show
      }

      // Set hints immediately — no delay needed since clearHints already ran
      setHintSource(hintPair.sourceIndex);
      setHintDestination(hintPair.destinationIndex);

      // Auto-clear hints after duration
      timeoutRef.current = setTimeout(() => {
        setHintSource(null);
        setHintDestination(null);
      }, duration);

      return true;
    },
    [clearHints, duration],
  );

  /**
   * Get the hint type for a specific tile index
   * @param {number} index - Tile index
   * @returns {string|null} 'source', 'destination', or null
   */
  const getHintType = useCallback(
    (index) => {
      if (index === hintSource) return "source";
      if (index === hintDestination) return "destination";
      return null;
    },
    [hintSource, hintDestination],
  );

  /**
   * Check if any hints are currently active
   */
  const hasActiveHint = hintSource !== null || hintDestination !== null;

  return {
    hintSource,
    hintDestination,
    hasActiveHint,
    showHint,
    clearHints,
    getHintType,
  };
};

export default useHint;
