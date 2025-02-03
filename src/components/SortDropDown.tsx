"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder } from "@/store/vehicleSlice";
import { RootState } from "@/store/store";

// SortDropdown component allows the user to select the sort order for vehicles based on the "Year" field (ascending or descending).
const SortDropdown = () => {
  const dispatch = useDispatch();
  const currentSortOrder = useSelector(
    (state: RootState) => state.vehicles.sortOrder
  );
  // Handler function to update sort order when user selects a different option
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(event.target.value as "asc" | "desc"));
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center space-x-2 relative">
        <select
          id="sort-by-year"
          value={currentSortOrder}
          onChange={handleSortChange}
          className="bg-white text-black px-6 py-2 text-lg rounded-full border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none pr-10 relative"
        >
          <option value="asc">Year (ASC)</option>
          <option value="desc">Year (DESC)</option>
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
