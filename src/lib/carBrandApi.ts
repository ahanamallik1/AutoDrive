import { apiRoutes } from "./apiRoutes";

/**
 * Fetches car brands and unique ids from the backend API.
 */
export const getAllCarBrands = async () => {
  try {
    const response = await fetch(`${apiRoutes.cars.brands}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
