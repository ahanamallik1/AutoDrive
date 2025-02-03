import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Vehicle } from "@/types/types";

export interface VehicleDetailsState {
  vehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
}

const initialState: VehicleDetailsState = {
  vehicle: null,
  loading: false,
  error: null,
};

// Async thunk to fetch vehicle details from the API
export const fetchVehicleDetails = createAsyncThunk<
  Vehicle,
  string, // slug
  { rejectValue: string }
>("vehicleDetails/fetchVehicleDetails", async (slug, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/vehicles/${slug}`);
    if (!res.ok) {
      throw new Error("Failed to fetch vehicle data"); // If the response is not ok, throw an error
    }
    const data: Vehicle = await res.json();
    return data; // Return the fetched vehicle data
  } catch (error) {
    console.log(error);
    return rejectWithValue("Something went wrong"); // If there is an error, reject with a message
  }
});

const vehicleDetailsSlice = createSlice({
  name: "vehicleDetails",
  initialState,
  // Reducer to reset the vehicle details (e.g., on unmount or navigating away)
  reducers: {
    resetVehicleDetails: (state) => {
      state.vehicle = null;
      state.error = null;
      state.loading = false;
    },
  },
  // Handling the different states of the fetchVehicleDetails async action
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVehicleDetails.fulfilled,
        (state, action: PayloadAction<Vehicle>) => {
          state.vehicle = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchVehicleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch vehicle details";
      });
  },
});

export const { resetVehicleDetails } = vehicleDetailsSlice.actions;
export default vehicleDetailsSlice.reducer;
