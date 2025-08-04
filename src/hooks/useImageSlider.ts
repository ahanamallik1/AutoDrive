import { useEffect, useState } from "react";

// Custom hook to create an automatic image slider.
export const useImageSlider = (images: string[]) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images]);
  return imageIndex;
};
