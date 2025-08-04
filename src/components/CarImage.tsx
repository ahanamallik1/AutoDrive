"use client";
import Image from "next/image";

interface CarImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
}

const CarImage: React.FC<CarImageProps> = ({
  src,
  alt,
  width = 500,
  height = 300,
}) => {
  return (
    // Wrapper for the image
    <figure className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
      {src ? (
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      ) : (
        // Fallback text when no image is provided
        <span className="text-gray-500 text-sm">No image available</span>
      )}
    </figure>
  );
};

export default CarImage;
