"use client";
import { useMemo, useState } from "react";
import { useDebouncedSearchInput } from "./useDebouncedSearchInput";
import { useQuerySync } from "./useQuerySync";
import { useSuggestedList } from "./useSuggestedCars";
import { CarOption } from "@/types/types";

/**
 * Custom hook to manage car brand search input and suggestions.
 * - Manages the search term with debounce to limit frequent updates.
 * - Synchronizes the debounced search term with the URL query parameter "query".
 * - Filters the provided brands list based on the current search term.
 * - Handles showing and hiding the suggestion list.
 * - Tracks the selected car's ID when a suggested option is clicked.
 */
export const useCarSearch = (initialTerm: string, brands: CarOption[] = []) => {
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const { searchTerm, debouncedSearchTerm, handleSearch, setSearchTerm } =
    useDebouncedSearchInput(initialTerm, 100);

  const { show, showList, hideList, setShow } = useSuggestedList();

  useQuerySync(debouncedSearchTerm, "query");

  const filteredBrands = useMemo(() => {
    return brands.filter((b) =>
      b.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  const handleClickSuggestedOption = (car: CarOption) => {
    setSearchTerm(car.brand);
    setSelectedCarId(car.id);
    setShow(false);
  };

  return {
    searchTerm,
    handleSearch,
    showList,
    show,
    setShow,
    hideList,
    filteredBrands,
    handleClickSuggestedOption,
    selectedCarId,
  };
};
