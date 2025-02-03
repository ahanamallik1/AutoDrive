import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vehicle } from "@/types/types";
import { RootState } from "./store";

export interface VehicleState {
  vehicles: Vehicle[]; // List of all fetched vehicles
  visibleVehicles: Vehicle[]; // Vehicles currently visible
  filteredVehicles: Vehicle[]; // subset of vehicles after applying filter condition
  count: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number; // Current page number
  limit: number; // Limit of vehicles per page
  searchQuery: string; // Search query string for filtering vehicles
  sortOrder: "asc" | "desc"; // Track sorting order
}
const initialState: VehicleState = {
  vehicles: [],
  visibleVehicles: [],
  filteredVehicles: [],
  count: 0,
  status: "loading",
  error: null,
  page: 1,
  limit: 10,
  searchQuery: "",
  sortOrder: "asc", // Default to ascending order
};

// The state structure includes vehicles, visible vehicles, filtered vehicles,
// pagination, sorting, error handling, and search query management
const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    // Action to start fetching vehicles with pagination
    fetchVehiclesStart(
      state,
      action: PayloadAction<{ page: number; limit: number }>
    ) {
      state.status = "loading";
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
    // Action triggered on successful fetch of vehicles
    fetchVehiclesSuccess(
      state,
      action: PayloadAction<{ count: number; data: Vehicle[] }>
    ) {
      state.status = "succeeded";
      state.count = action.payload.count;

      // Combine the current vehicles with the new ones and remove duplicates (if any)
      const combinedVehicles = [...state.vehicles, ...action.payload.data];
      const uniqueVehicles = [
        ...new Map(
          combinedVehicles.map((vehicle) => [
            `${vehicle.brand}-${vehicle.model}-${vehicle.year}-${vehicle.condition}`, // Unique key based on multiple fields
            vehicle,
          ])
        ).values(),
      ];

      // Update vehicles list
      state.vehicles = uniqueVehicles;

      // Filter vehicles based on the search query and sort them by year
      state.visibleVehicles = state.vehicles
        .filter((vehicle) =>
          [vehicle.brand, vehicle.model, vehicle.year.toString()].some(
            (field) =>
              field.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        )
        .sort((a, b) => {
          return state.sortOrder === "asc" ? a.year - b.year : b.year - a.year;
        });
    },
    // Action triggered when fetching vehicles fails
    fetchVehiclesFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    // Action to update the search query and filter the visible vehicles.
    // visibleVehicles array will contain the vehicles that match the search query  and are sorted by year in the desired order.
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.visibleVehicles = (
        state.filteredVehicles.length ? state.filteredVehicles : state.vehicles
      )
        .filter((vehicle) =>
          [vehicle.brand, vehicle.model, vehicle.year.toString()].some(
            (field) =>
              field.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        )
        .sort((a, b) => {
          return state.sortOrder === "asc" ? a.year - b.year : b.year - a.year;
        });
    },
    // Action to reset the vehicle state, useful when clearing data
    resetVehicles(state) {
      state.vehicles = [];
      state.visibleVehicles = [];
      state.filteredVehicles = [];
      state.count = 0;
      state.page = 1;
      state.status = "idle";
      state.error = null;
      state.searchQuery = "";
    },
    // Action to update the sorting order and re-sort the visible vehicles
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
      // Re-sort the visible vehicles when the sort order is changed
      state.visibleVehicles = state.visibleVehicles.sort((a, b) => {
        return state.sortOrder === "asc" ? a.year - b.year : b.year - a.year;
      });
    },
    // Manages core filtering logic (e.g., "New/Used" status)
    //This ensures consistency across all components that rely on filtered data and allows the state to be managed centrally.
    updateFilteredVehicles(state, action: PayloadAction<Vehicle[]>) {
      state.filteredVehicles = action.payload;
      // Also update visibleVehicles based on the search query and sort them.
      state.visibleVehicles = state.filteredVehicles
        .filter((vehicle) =>
          [vehicle.brand, vehicle.model, vehicle.year.toString()].some(
            (field) =>
              field.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        )
        .sort((a, b) => {
          return state.sortOrder === "asc" ? a.year - b.year : b.year - a.year;
        });
    },
  },
});

export const {
  fetchVehiclesStart,
  fetchVehiclesSuccess,
  fetchVehiclesFailure,
  setSearchQuery,
  setSortOrder,
  resetVehicles,
  updateFilteredVehicles,
} = vehicleSlice.actions;

export const selectVehiclesState = (state: RootState) => state.vehicles;

export default vehicleSlice.reducer;
