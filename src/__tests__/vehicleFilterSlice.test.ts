import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import vehicleFilterReducer, {
  fetchFilteredVehicles,
} from "@/store/vehicleFilterSlice";
import { AppDispatch } from "@/store/store";
import { Vehicle } from "@/types/types";

// Define VehicleFilterState within the test file
interface VehicleFilterState {
  filteredVehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

// Mock data to use in the tests
const mockVehicles = [
  { id: 1, brand: "Tesla", model: "Model S", year: 2020 },
  { id: 2, brand: "BMW", model: "X5", year: 2021 },
];

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: mockVehicles }),
  })
) as jest.Mock;

describe("vehicleFilterSlice", () => {
  let store: EnhancedStore<{ vehicleFilter: VehicleFilterState }>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        vehicleFilter: vehicleFilterReducer,
      },
    });
    dispatch = store.dispatch as AppDispatch;
  });

  test("should return the initial state", () => {
    const state = store.getState() as { vehicleFilter: VehicleFilterState };
    expect(state.vehicleFilter).toEqual({
      filteredVehicles: [],
      loading: false,
      error: null,
    });
  });

  test("should handle pending state when fetching vehicles", async () => {
    dispatch(fetchFilteredVehicles("condition"));
    const state = store.getState() as { vehicleFilter: VehicleFilterState };
    expect(state.vehicleFilter.loading).toBe(true);
    expect(state.vehicleFilter.error).toBeNull();
  });

  test("should handle fulfilled state when vehicles are fetched", async () => {
    await dispatch(fetchFilteredVehicles("condition"));
    const state = store.getState() as { vehicleFilter: VehicleFilterState };
    expect(state.vehicleFilter.loading).toBe(false);
    expect(state.vehicleFilter.filteredVehicles).toEqual(mockVehicles);
    expect(state.vehicleFilter.error).toBeNull();
  });

  test("should handle rejected state when there is an error", async () => {
    // Mock fetch to simulate an error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject("Failed to fetch"),
      })
    ) as jest.Mock;

    await dispatch(fetchFilteredVehicles("condition"));
    const state = store.getState() as { vehicleFilter: VehicleFilterState };
    expect(state.vehicleFilter.loading).toBe(false);
    expect(state.vehicleFilter.error).toBe("Failed to fetch vehicles");
  });
});
