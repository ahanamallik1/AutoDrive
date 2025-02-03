"use client";

import React from "react";

interface FilterComponentProps {
  onFilterChange: (filterCondition: string) => void;
}

// Filter component enables user to filter all cars based on Condition (New or Used)
const FilterComponent: React.FC<FilterComponentProps> = ({
  onFilterChange,
}) => {
  // Handles the filter change event when a user selects a filter option
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange(value);
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={handleFilterChange}
        className="bg-white text-black px-6 py-2 text-lg rounded-full border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none pr-10"
      >
        {/* Dropdown options for filtering cars */}
        <option value="">Select All Cars</option>
        <option value="new">All New Cars</option>
        <option value="used">All Used Cars</option>
      </select>
    </div>
  );
};

export default FilterComponent;
