"use client";

import { useCategorySync } from "@/hooks/useFilter";
import React, { useState } from "react";

interface FilterByStatusSelectProps {
  category: string;
}
// FilterByStatusSelect component renders a styled dropdown to filter items by status.
const FilterByStatusSelect: React.FC<FilterByStatusSelectProps> = ({
  category,
}) => {
  const [status, setStatus] = useState<string>(category);

  // Sync status with external hook
  useCategorySync(status);
  // Update status on select change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div className="w-60">
      <select
        id="status-filter"
        value={status}
        onChange={handleStatusChange}
        className="block w-full appearance-none rounded-3xl border border-gray-300 bg-white px-5 py-3 text-lg text-gray-700 shadow-sm transition duration-200 ease-in-out hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      >
        <option value="filter by status">Filter by Status</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
    </div>
  );
};

export default FilterByStatusSelect;
