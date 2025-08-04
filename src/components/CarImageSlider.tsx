"use client";

import { useImageSlider } from "@/hooks/useImageSlider";
import Image from "next/image";

interface CarImageSliderProps {
  images: string[];
  altText: string;
}
// Custom hook to manage image index for the slider
const CarImageSlider: React.FC<CarImageSliderProps> = ({ images, altText }) => {
  const currentImageIndex = useImageSlider(images);

  return (
    <section aria-label="Car image slider" className="w-[400px] h-[250px]">
      <figure className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={altText}
          width={400}
          height={250}
          className="object-cover transition-opacity duration-500"
        />
        <figcaption className="sr-only">{altText}</figcaption>
      </figure>
    </section>
  );
};

export default CarImageSlider;
