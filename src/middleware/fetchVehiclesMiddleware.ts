import { Middleware } from "@reduxjs/toolkit";
import {
  fetchVehiclesStart,
  fetchVehiclesSuccess,
  fetchVehiclesFailure,
} from "../store/vehicleSlice";
import { VehicleResponse } from "@/types/types";

// Custom middleware to handle fetching vehicles data based on the page and limit from the action payload
export const fetchVehiclesMiddleware: Middleware =
  (storeAPI) => (next) => async (action) => {
    // Check if the action is the start of a fetch request
    if (fetchVehiclesStart.match(action)) {
      try {
        const { page, limit } = action.payload;
        // Make an API request to fetch vehicles data with pagination
        const response = await fetch(
          `/api/vehicles?page=${page}&limit=${limit}`
        );
        const data: VehicleResponse = await response.json();
        // Dispatch success action with the fetched data
        storeAPI.dispatch(
          fetchVehiclesSuccess({ count: data.count, data: data.data })
        );
      } catch (error) {
        // If the request fails, dispatch failure action with error message
        storeAPI.dispatch(
          fetchVehiclesFailure(
            (error as Error).message || "Failed to fetch vehicles"
          )
        );
      }
    } else {
      return next(action);
    }
  };
