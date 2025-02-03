import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVehiclesStart,
  setSearchQuery,
  setSortOrder,
} from "@/store/vehicleSlice";
import { fetchFilteredVehicles } from "@/store/vehicleFilterSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useDebounce } from "use-debounce";

export const useVehicleList = () => {
  // Dispatch and state selectors from Redux store
  const dispatch = useDispatch<AppDispatch>();
  const { visibleVehicles, status, error, count, searchQuery, sortOrder } =
    useSelector((state: RootState) => state.vehicles);
  const { filteredVehicles, error: filterError } = useSelector(
    (state: RootState) => state.vehicleFilter
  );

  const [currentPage, setCurrentPage] = useState(1);
  // Debouncing search query to avoid unneccessary re-renders
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  useEffect(() => {
    // Fetch vehicles based on page and limit
    dispatch(fetchVehiclesStart({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  // Update the search query in Redux store after debouncing
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);
  // useMemo hook refines the list based on search input.
  // This avoids unnecessary Redux state updates when only the search query changes, improving performance.
  const filteredAndSearchedVehicles = useMemo(() => {
    return (filteredVehicles.length ? filteredVehicles : [])
      .filter((vehicle) =>
        debouncedSearchQuery
          ? vehicle.brand
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()) ||
            vehicle.model
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()) ||
            vehicle.year.toString().includes(debouncedSearchQuery)
          : true
      )
      .sort((a, b) =>
        sortOrder === "asc" ? a.year - b.year : b.year - a.year
      );
  }, [filteredVehicles, debouncedSearchQuery, sortOrder]);

  const hasMore =
    visibleVehicles.length < count && filteredAndSearchedVehicles.length === 0;

  // Callback to handle loading more vehicles when the user reaches the end of the list.
  // Memoize it to avoid unneccessary re-renders.
  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  // Callback to handle search input change and update search query in Redux.
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  // Callback to handle filter change .
  const handleFilterChange = useCallback(
    (newFilterCondition: string) => {
      // Dispatch the action to fetch filtered vehicles based on condition
      dispatch(fetchFilteredVehicles(newFilterCondition));
      setCurrentPage(1);
    },
    [dispatch]
  );
  // Callback to handle sorting order change and update sort order in Redux
  const handleSortChange = useCallback(
    (newSortOrder: "asc" | "desc") => {
      // Dispatch an action to change the sorting order
      dispatch(setSortOrder(newSortOrder));
    },
    [dispatch]
  );

  return {
    visibleVehicles,
    filteredAndSearchedVehicles,
    filteredVehicles,
    status,
    error,
    filterError,
    currentPage,
    debouncedSearchQuery,
    searchQuery,
    hasMore,
    handleLoadMore,
    handleSearch,
    handleFilterChange,
    handleSortChange,
  };
};
