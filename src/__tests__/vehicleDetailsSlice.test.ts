import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import vehicleDetailsReducer, {
  fetchVehicleDetails,
  resetVehicleDetails,
  VehicleDetailsState,
} from "@/store/vehicleDetailsSlice";
import { Vehicle } from "@/types/types";
import { AppDispatch } from "@/store/store";

// Mock data to use in the tests
const mockVehicle: Vehicle = {
  brand: "Tesla",
  model: "Model S",
  year: 2020,
  price: 79999,
  condition: "new",
  images: ["tesla-model-s.jpg"],
  range_km: 0,
  color: "",
  battery_capacity_kWh: 0,
  charging_speed_kW: 0,
  seats: 0,
  drivetrain: "",
  location: "",
  autopilot: false,
  kilometer_count: 0,
  accidents: false,
};

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockVehicle),
  })
) as jest.Mock;

describe("vehicleDetailsSlice", () => {
  let store: EnhancedStore<{ vehicleDetails: VehicleDetailsState }>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        vehicleDetails: vehicleDetailsReducer,
      },
    });
    dispatch = store.dispatch as AppDispatch;
  });

  test("should return the initial state", () => {
    const state = store.getState() as { vehicleDetails: VehicleDetailsState };
    expect(state.vehicleDetails).toEqual({
      vehicle: null,
      loading: false,
      error: null,
    });
  });

  test("should handle pending state when fetching vehicle details", async () => {
    dispatch(fetchVehicleDetails("tesla-model-s"));
    const state = store.getState() as { vehicleDetails: VehicleDetailsState };
    expect(state.vehicleDetails.loading).toBe(true);
    expect(state.vehicleDetails.error).toBeNull();
  });

  test("should handle fulfilled state when vehicle details are fetched", async () => {
    await dispatch(fetchVehicleDetails("tesla-model-s"));
    const state = store.getState() as { vehicleDetails: VehicleDetailsState };
    expect(state.vehicleDetails.loading).toBe(false);
    expect(state.vehicleDetails.vehicle).toEqual(mockVehicle);
    expect(state.vehicleDetails.error).toBeNull();
  });

  test("should handle rejected state when there is an error", async () => {
    // Mock fetch to simulate an error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject("Failed to fetch"),
      })
    ) as jest.Mock;

    await dispatch(fetchVehicleDetails("invalid-slug"));
    const state = store.getState() as { vehicleDetails: VehicleDetailsState };
    expect(state.vehicleDetails.loading).toBe(false);
    expect(state.vehicleDetails.error).toBe("Something went wrong");
  });

  test("should reset vehicle details", () => {
    dispatch(resetVehicleDetails());
    const state = store.getState() as { vehicleDetails: VehicleDetailsState };
    expect(state.vehicleDetails.vehicle).toBeNull();
    expect(state.vehicleDetails.loading).toBe(false);
    expect(state.vehicleDetails.error).toBeNull();
  });
});
