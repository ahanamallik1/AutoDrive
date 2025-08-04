import { CarRoutes } from "@/types/types";
/**
 * Defines API endpoint URLs for car-related resources.
 *
 * BASE_URL: Base server URL used for all endpoints.
 *
 * ApiRoutes interface groups endpoints related to cars.
 *
 * apiRoutes object provides:
 *  - list: URL to fetch the list of all cars
 *  - brands: URL to fetch available car brands
 *  - carDetails: function that returns URL to fetch details of a specific car by its ID
 */

const BASE_URL = "http://localhost:3000";

interface ApiRoutes {
  cars: CarRoutes;
}

export const apiRoutes: ApiRoutes = {
  cars: {
    list: `${BASE_URL}/api/cars`,
    brands: `${BASE_URL}/api/cars/brands`,
    carDetails: (id: string) => `${BASE_URL}/api/cars/${id}`,
  },
};
