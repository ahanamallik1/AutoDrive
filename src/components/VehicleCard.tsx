"use client";

import { FC } from "react";
import Image from "next/image";
import { Vehicle } from "../types/types";
import Link from "next/link";

interface VehicleCardProps {
  vehicle: Vehicle;
}

// VehicleCard component to display each vehicle in the vehicles list.
const VehicleCard: FC<VehicleCardProps> = ({ vehicle }) => {
  // Construct the slug for the vehicle URL dynamically.
  const slug = `${vehicle.brand.toLowerCase()}-${vehicle.model.toLowerCase()}-${
    vehicle.year
  }`;

  return (
    <div className="flex flex-col p-6 border border-gray-300 rounded-lg shadow-lg bg-white text-black hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {/* Vehicle brand heading */}
        {vehicle.brand}
      </h2>
      {/* Vehicle image */}
      <Image
        src={vehicle.images[0]}
        alt={`${vehicle.brand} ${vehicle.model}`}
        width={300}
        height={200}
        className="w-full h-auto mb-4 rounded-lg object-cover"
      />
      <div className="space-y-2">
        {/* Vehicle model, year, price, and condition */}
        <p className="text-lg text-gray-600">Model: {vehicle.model}</p>
        <p className="text-lg text-gray-600">Year: {vehicle.year}</p>
        <p className="text-lg text-gray-600">Price: {vehicle.price} €</p>
        <p className="text-lg text-gray-600">Condition: {vehicle.condition}</p>
        <p>
          {/* Button to navigate to a particular vehicle details page */}
          <Link href={`/vehicles/${slug}`}>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
              View Details
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
