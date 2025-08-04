"use client";
import { Car } from "@/types/types";
import Link from "next/link";
import CarDetailsCard from "./CarDetailsCard";
import CarImage from "./CarImage";
import ButtonLink from "./ButtonLink";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  // Ensure a valid car object is provided
  if (!car) throw new Error("Car prop is required");
  return (
    // Entire card is wrapped in a link to the car details page
    <Link
      href={`/carDetails/${car.id}`}
      aria-label={`View details of ${car.brand || "this car"} ${
        car.model || ""
      }`}
    >
      <article
        className="max-w-md rounded-xl border bg-white shadow-sm overflow-hidden ml-4
             transform transition-transform duration-300 hover:scale-105"
      >
        {/* Car Image */}
        <CarImage src={car.images?.[0]} alt={`${car.brand} ${car.model}`} />

        {/* Car Details */}
        <CarDetailsCard car={car} />

        {/* View Details button Link */}
        <ButtonLink
          href={`/carDetails/${car.id}`}
          className="inline-block mt-2 mb-4 ml-4 mx-auto rounded-md bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700 transition-colors duration-200"
          ariaLabel={`View details of ${car.brand || "this car"} ${
            car.model || ""
          }`}
        >
          View Details
        </ButtonLink>
      </article>
    </Link>
  );
};

export default CarCard;
