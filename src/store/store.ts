import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicleSlice";
import filterVehicleReducer from "./vehicleFilterSlice";
import { fetchVehiclesMiddleware } from "../middleware/fetchVehiclesMiddleware";
import vehicleDetailsReducer from "./vehicleDetailsSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    vehicleFilter: filterVehicleReducer,
    vehicleDetails: vehicleDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchVehiclesMiddleware),
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
