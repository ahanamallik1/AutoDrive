"use client";

import { useCarSearch } from "@/hooks/useSearch";
import SuggestedCarsList from "./SuggestedCarList";
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { CarOption } from "@/types/types";

interface SearchProps {
  search: string;
  brands: CarOption[];
}
// SearchInput component provides a controlled text input for searching cars by brand or model.
const SearchInput: React.FC<SearchProps> = ({
  search: initialSearch,
  brands,
}) => {
  // Custom hook manages search state and logic
  const {
    searchTerm,
    show,
    showList,
    handleSearch,
    hideList,
    filteredBrands,
    handleClickSuggestedOption,
  } = useCarSearch(initialSearch, brands);

  // Ref for detecting clicks outside the component
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide suggestion list when clicking outside
  useClickOutside(containerRef, () => {
    if (show) hideList();
  });

  return (
    <section className="w-74 z-50 ml-4 mt-2" ref={containerRef}>
      <form className="mb-4">
        <input
          id="car-search"
          type="text"
          placeholder="Search Cars by brand or model"
          value={searchTerm}
          onChange={handleSearch}
          onClick={showList}
          autoComplete="off"
          className="w-full rounded-3xl border border-gray-300 px-5 py-3 text-lg shadow-sm placeholder-gray-400
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </form>
      {/* Suggestion dropdown displayed */}
      {show && (
        <SuggestedCarsList
          show={show}
          brands={filteredBrands}
          handleClick={handleClickSuggestedOption}
        />
      )}
    </section>
  );
};

export default SearchInput;
