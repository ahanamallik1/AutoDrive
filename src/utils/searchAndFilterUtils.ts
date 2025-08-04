import { Car } from "@/types/types";
import { validateSearch } from "./validateSearch";
import { validateCategory } from "./validateFilter";

export const searchAndFilterCars = (
  query: string,
  cars: Car[],
  category: string
) => {
  let filtered = cars;
  const validatedCategory = validateCategory(category);
  if (validatedCategory && validatedCategory !== "filter by status") {
    filtered = filtered.filter(
      (car: Car) => car.condition.toLowerCase() === category
    );
  }
  if (query && validateSearch(query)) {
    filtered = filtered.filter(
      (car: Car) =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query)
    );
  }
  return filtered;
};
