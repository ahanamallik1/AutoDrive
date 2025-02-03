import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Vehicle, VehicleResponse } from "@/types/types";
import { updateFilteredVehicles } from "./vehicleSlice";

interface VehicleFilterState {
  filteredVehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

const initialState: VehicleFilterState = {
  filteredVehicles: [],
  loading: false,
  error: null,
};

// Thunk to fetch vehicles based on a filter condition passed as argument
export const fetchFilteredVehicles = createAsyncThunk<Vehicle[], string>(
  "vehicles/fetchFilteredVehicles",
  async (condition, { rejectWithValue, dispatch }) => {
    try {
      // Fetch filtered vehicles from API based on the provided condition
      const response = await fetch(
        `/api/vehicles/filter?condition=${condition}`
      );
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data: VehicleResponse = await response.json();
      // Update the Redux store with the filtered data.
      // This ensures that the latest filtered list of vehicles is available globally within the app and no need of re-fetching
      dispatch(updateFilteredVehicles(data.data));
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch vehicles"); // In case of error, return rejection
    }
  }
);

const vehicleFilterSlice = createSlice({
  name: "vehicleFilter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredVehicles = action.payload; // Set the fetched filtered vehicles in the state
      })
      .addCase(fetchFilteredVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default vehicleFilterSlice.reducer;
