import { useState, useEffect } from "react";

// Custom hook to handle image slider logic
export const useImageSlider = (images: string[]) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image index every 3 seconds

      return () => clearInterval(interval); // Clean up interval when component unmounts
    }
  }, [images]);

  return currentImageIndex;
};
