"use client";

import React, { useState, Suspense } from "react";
import { useVehicleList } from "../hook/useVehicleList";
import dynamic from "next/dynamic";
import SearchInput from "./Search";
import FilterComponent from "./FilterComponent";
import SortDropdown from "./SortDropDown";

// Dynamically import VehicleCard to enable lazy loading and reduce the initial bundle size
const VehicleCard = dynamic(() => import("./VehicleCard"), { ssr: false });

const VehicleList = () => {
  const {
    visibleVehicles,
    filteredAndSearchedVehicles,
    status,
    error,
    filterError,
    searchQuery,
    hasMore,
    handleLoadMore,
    handleSearch,
    handleFilterChange,
  } = useVehicleList();

  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex flex-wrap items-center mb-4 gap-2">
          {/* Search Bar */}
          <div className="flex-grow mt-4">
            {status == "succeeded" && (
              <SearchInput
                handleSearch={handleSearch}
                searchQuery={searchQuery}
              />
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-3xl"
            >
              &#9776; {/* Hamburger Icon */}
            </button>
          </div>
        </div>

        {/* Mobile Menu  Filter and Sort Dropdown components */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 mb-4">
            {/* Filter Component */}
            <div className="flex-shrink-0 w-full">
              {status == "succeeded" && (
                <FilterComponent onFilterChange={handleFilterChange} />
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex-shrink-0 w-full">
              {status == "succeeded" && <SortDropdown />}
            </div>
          </div>
        )}

        {/* Desktop Filter and Sort components */}
        <div className="hidden md:flex flex-wrap gap-2 mb-4">
          {/* Filter Component */}
          <div className="flex-shrink-0 w-full md:w-auto">
            {status == "succeeded" && (
              <FilterComponent onFilterChange={handleFilterChange} />
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex-shrink-0 w-full md:w-auto">
            {status == "succeeded" && <SortDropdown />}
          </div>
        </div>

        {/* Show spinner only if initial load is happening */}
        {status === "loading" && visibleVehicles.length === 0 && (
          <div className="flex justify-center mt-6">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-white-600 border-t-transparent"></div>
          </div>
        )}

        {/* Show error message if data fetch failed */}
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}
        {filterError && (
          <p className="text-red-500">Filter Error: {filterError}</p>
        )}

        {/* Checks if there are any filtered or visible vehicles.
        The VehicleCard component is dynamically loaded using Suspense */}
        {(filteredAndSearchedVehicles.length > 0 ||
          visibleVehicles.length > 0) && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense
                fallback={
                  <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-white-600 border-t-transparent"></div>
                }
              >
                {(filteredAndSearchedVehicles.length > 0
                  ? filteredAndSearchedVehicles
                  : visibleVehicles
                ).map((vehicle, index) => (
                  <VehicleCard
                    key={`${vehicle.brand}-${vehicle.model}-${vehicle.year}-${index}`}
                    vehicle={vehicle}
                  />
                ))}
              </Suspense>
            </div>

            {/* Show Load More Button */}
            <div className="flex justify-between mt-6">
              {hasMore && status !== "loading" && (
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-200"
                >
                  Load More
                </button>
              )}

              {/* Show message when no more vehicles are available to load */}
              {!hasMore && status !== "loading" && (
                <p className="text-white-400">No more vehicles available.</p>
              )}
            </div>
          </>
        )}

        {/* Show message when no vehicles are available in current visible vehicles list */}
        {filteredAndSearchedVehicles.length === 0 &&
          visibleVehicles.length === 0 &&
          status !== "loading" && (
            <p className="text-white-400">Vehicle not present or Load More</p>
          )}
      </div>
    </div>
  );
};

export default VehicleList;
