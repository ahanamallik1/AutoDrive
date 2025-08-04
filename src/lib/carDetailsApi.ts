import { apiRoutes } from "./apiRoutes";
/**
 * Fetches a particular car data based on id from the backend API.
 */
export const getCarDetails = async (id: string) => {
  try {
    const response = await fetch(apiRoutes.cars.carDetails(id), {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });
    if (!response.ok) {
      throw new Error("Failed to fetch car");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
};
