"use client";

import { Car } from "@/types/types";

interface CarDetailsProps {
  car: Car;
}

const CarDetailsCard: React.FC<CarDetailsProps> = ({ car }) => (
  <section className="p-6">
    {/* Car brand as the header */}
    <header className="mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        {car.brand || "Unknown Brand"}
      </h2>
    </header>
    {/* Car information list */}
    <div className="space-y-2 text-gray-700 text-sm">
      <p>
        {/* Car model */}
        <strong className="inline-block w-20 text-gray-500">Model:</strong>
        <span>{car.model || "N/A"}</span>
      </p>
      <p>
        {/* Car year */}
        <strong className="inline-block w-20 text-gray-500">Year:</strong>
        <span>{car.year || "N/A"}</span>
      </p>
      <p>
        {/* Car condition */}
        <strong className="inline-block w-20 text-gray-500">Status:</strong>
        <span>{car.condition || "N/A"}</span>
      </p>
      <p>
        {/* Car price */}
        <strong className="inline-block w-20 text-gray-500">Price:</strong>
        <span>
          {car.price
            ? `${car.price} €
`
            : "Not listed"}
        </span>
      </p>
    </div>
  </section>
);

export default CarDetailsCard;
