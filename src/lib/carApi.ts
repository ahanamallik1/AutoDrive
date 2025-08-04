import { apiRoutes } from "./apiRoutes";

/**
 * Fetches car data from the backend API.
 */
export const getCars = async (
  page: number,
  limit: number,
  query: string,
  category: string
) => {
  const searchParams = new URLSearchParams();
  if (query) searchParams.set("query", query);
  if (category) searchParams.set("category", category);
  if (page) searchParams.set("page", page.toString());
  if (limit) searchParams.set("limit", limit.toString());
  try {
    const response = await fetch(
      `${apiRoutes.cars.list}?${searchParams.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
