import { useState } from "react";
import { useDebounceSearch } from "./useDebounceSearch";

//  Custom hook to manage a search input with debouncing.
export const useDebouncedSearchInput = (initial: string = "", delay = 300) => {
  const [searchTerm, setSearchTerm] = useState(initial);
  const debouncedSearchTerm = useDebounceSearch(searchTerm, delay);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchTerm(value);
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
    setSearchTerm,
  };
};
