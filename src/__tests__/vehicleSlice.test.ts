// src/__tests__/vehicleSlice.test.ts
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import vehicleReducer, {
  fetchVehiclesStart,
  fetchVehiclesSuccess,
  fetchVehiclesFailure,
  setSearchQuery,
  setSortOrder,
  resetVehicles,
  updateFilteredVehicles,
  VehicleState,
} from "@/store/vehicleSlice";
import { Vehicle } from "@/types/types";
import { RootState, AppDispatch } from "@/store/store";

// Mock data to use in the tests
const mockVehicles: Vehicle[] = [
  {
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
  },
  {
    brand: "BMW",
    model: "X5",
    year: 2021,
    price: 59999,
    condition: "new",
    images: ["bmw-x5.jpg"],
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
  },
];

describe("vehicleSlice", () => {
  let store: EnhancedStore<{ vehicles: VehicleState }>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        vehicles: vehicleReducer,
      },
    });
    dispatch = store.dispatch as AppDispatch;
  });

  test("should return the initial state", () => {
    const state = store.getState() as RootState;
    expect(state.vehicles).toEqual({
      vehicles: [],
      visibleVehicles: [],
      filteredVehicles: [],
      count: 0,
      status: "loading",
      error: null,
      page: 1,
      limit: 10,
      searchQuery: "",
      sortOrder: "asc",
    });
  });

  test("should handle fetchVehiclesStart", () => {
    dispatch(fetchVehiclesStart({ page: 1, limit: 10 }));
    const state = store.getState() as RootState;
    expect(state.vehicles.status).toBe("loading");
    expect(state.vehicles.page).toBe(1);
    expect(state.vehicles.limit).toBe(10);
  });

  test("should handle fetchVehiclesSuccess", () => {
    dispatch(fetchVehiclesSuccess({ count: 2, data: mockVehicles }));
    const state = store.getState() as RootState;
    expect(state.vehicles.status).toBe("succeeded");
    expect(state.vehicles.count).toBe(2);
    expect(state.vehicles.vehicles).toEqual(mockVehicles);
    expect(state.vehicles.visibleVehicles).toEqual(mockVehicles);
  });

  it("should handle fetchVehiclesFailure", () => {
    dispatch(fetchVehiclesFailure("Failed to fetch vehicles"));
    const state = store.getState() as RootState;
    expect(state.vehicles.status).toBe("failed");
    expect(state.vehicles.error).toBe("Failed to fetch vehicles");
  });

  test("should handle setSearchQuery", () => {
    dispatch(fetchVehiclesSuccess({ count: 2, data: mockVehicles }));
    dispatch(setSearchQuery("Tesla"));
    const state = store.getState() as RootState;
    expect(state.vehicles.searchQuery).toBe("Tesla");
    expect(state.vehicles.visibleVehicles).toEqual([mockVehicles[0]]);
  });

  test("should handle setSortOrder", () => {
    dispatch(fetchVehiclesSuccess({ count: 2, data: mockVehicles }));
    dispatch(setSortOrder("desc"));
    const state = store.getState() as RootState;
    expect(state.vehicles.sortOrder).toBe("desc");
    expect(state.vehicles.visibleVehicles).toEqual(
      mockVehicles.slice().sort((a, b) => b.year - a.year)
    );
  });

  test("should handle resetVehicles", () => {
    dispatch(fetchVehiclesSuccess({ count: 2, data: mockVehicles }));
    dispatch(resetVehicles());
    const state = store.getState() as RootState;
    expect(state.vehicles).toEqual({
      vehicles: [],
      visibleVehicles: [],
      filteredVehicles: [],
      count: 0,
      status: "idle",
      error: null,
      page: 1,
      limit: 10,
      searchQuery: "",
      sortOrder: "asc",
    });
  });

  test("should handle updateFilteredVehicles", () => {
    dispatch(updateFilteredVehicles(mockVehicles));
    const state = store.getState() as RootState;
    expect(state.vehicles.filteredVehicles).toEqual(mockVehicles);
    expect(state.vehicles.visibleVehicles).toEqual(mockVehicles);
  });
});
