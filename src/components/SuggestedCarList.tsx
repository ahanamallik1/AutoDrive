"use client";

import { CarOption } from "@/types/types";
import React from "react";

interface SuggestedCarsListProps {
  show: boolean;
  brands: CarOption[];
  handleClick: (car: CarOption) => void;
}

const SuggestedCarsList: React.FC<SuggestedCarsListProps> = ({
  show,
  brands,
  handleClick,
}) => {
  // Return null if dropdown should be hidden or there are no brands to show
  if (!show || brands.length === 0) return null;
  return (
    // Dropdown container with accessibility role and styling
    <ul
      className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg"
      role="listbox"
    >
      {/* Render each car brand as a clickable list item */}
      {brands.map((car) => (
        <li
          key={car.id}
          onClick={() => handleClick(car)}
          className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
        >
          {car.brand}
        </li>
      ))}
    </ul>
  );
};

export default SuggestedCarsList;
