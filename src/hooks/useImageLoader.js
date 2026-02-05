import { useState, useEffect, useCallback, useMemo } from "react";

const IMAGE_BASE_URL = "https://picsum.photos/id";
const DEFAULT_IMAGE_SIZE = 600;

/**
 * Hook to manage image loading from picsum.photos
 * @param {number} imageSize - Size of the image to load
 * @returns {Object} Image state and controls
 */
export const useImageLoader = (imageSize = DEFAULT_IMAGE_SIZE) => {
  const [imageId, setImageId] = useState(() =>
    Math.floor(Math.random() * 1000),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUrl, setLoadedUrl] = useState(null);

  // Memoize the URL to prevent unnecessary recalculations
  const imageUrl = useMemo(
    () => `${IMAGE_BASE_URL}/${imageId}/${imageSize}`,
    [imageId, imageSize],
  );

  // Preload image when imageId changes
  useEffect(() => {
    setIsLoading(true);

    const img = new Image();
    const urlToLoad = `${IMAGE_BASE_URL}/${imageId}/${imageSize}`;

    img.onload = () => {
      setLoadedUrl(urlToLoad);
      setIsLoading(false);
    };

    img.onerror = () => {
      // If image fails to load, try a different ID
      setImageId(Math.floor(Math.random() * 1000));
    };

    img.src = urlToLoad;

    // Cleanup: if component unmounts or imageId changes before load completes
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageId, imageSize]);

  /**
   * Load a new random image
   */
  const loadNewImage = useCallback(() => {
    setImageId(Math.floor(Math.random() * 1000));
  }, []);

  /**
   * Load a specific image by ID
   * @param {number} id - The picsum.photos image ID
   */
  const loadImageById = useCallback((id) => {
    setImageId(id);
  }, []);

  return {
    // Use loadedUrl when available to ensure we only render fully loaded images
    imageUrl: loadedUrl || imageUrl,
    imageId,
    isLoading,
    loadNewImage,
    loadImageById,
  };
};

export default useImageLoader;
