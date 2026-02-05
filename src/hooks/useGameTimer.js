import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Hook to manage a game timer
 * @returns {Object} Timer state and controls
 */
export const useGameTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Handle interval setup and cleanup
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  /**
   * Start the timer
   */
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  /**
   * Stop the timer
   */
  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  /**
   * Reset the timer to 0 and stop it
   */
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  /**
   * Reset the timer to 0 and start it
   */
  const restartTimer = useCallback(() => {
    setTime(0);
    setIsRunning(true);
  }, []);

  /**
   * Format time as MM:SS
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = useCallback(
    (seconds = time) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    },
    [time],
  );

  return {
    time,
    isRunning,
    formattedTime: formatTime(),
    startTimer,
    stopTimer,
    resetTimer,
    restartTimer,
    formatTime,
  };
};

export default useGameTimer;
