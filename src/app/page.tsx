/* eslint-disable @typescript-eslint/no-explicit-any */
import CarList from "@/components/CarList";
import FilterByStatusSelect from "@/components/FilterInput";
import Pagination from "@/components/Paginattion";
import SearchInput from "@/components/SearchInput";
import { getCars } from "@/lib/carApi";
import { getAllCarBrands } from "@/lib/carBrandApi";
import { validateCategory } from "@/utils/validateFilter";

import {
  handleInvalidPage,
  sanitizeLimit,
  sanitizePage,
} from "@/utils/validatePagination";
import { validateSearch } from "@/utils/validateSearch";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    query?: string;
    category?: string;
  };
}) {
  const page = parseInt(searchParams?.page || "1", 10);
  const limit = parseInt(searchParams?.limit || "5", 10);
  const query = searchParams?.query || "";
  const category = searchParams?.category || "filter by status";

  const sanitizedPage = sanitizePage(page);
  const sanitizedLimit = sanitizeLimit(limit);
  const isValidQuery = validateSearch(query);
  const finalQuery = isValidQuery ? query : "";
  const validatedCategory = validateCategory(category) || "";

  // Fetch paginated car data from the API
  const result = await getCars(
    sanitizedPage,
    sanitizedLimit,
    finalQuery,
    validatedCategory
  );
  const cars = result.cars;
  const currentPage = result.page;
  const totalPages = result.totalPages;
  const inValidPage = handleInvalidPage(sanitizedPage, totalPages);
  if (inValidPage) {
    // Redirect to page 1 preserving other query params
    const params = new URLSearchParams(searchParams as any);
    params.set("page", "1");
    redirect(`/?${params.toString()}`);
  }
  // Fetch car brand data from the API
  const response = await getAllCarBrands();
  const carBrands = response.cars;

  const hasCars = cars.length > 0;

  return (
    <main>
      {hasCars && (
        <div className="flex flex-row gap-4 mb-6 w-full max-w-md">
          <div className="flex-shrink-0 flex-grow">
            <SearchInput search={finalQuery} brands={carBrands} />
          </div>
          <div className="flex-shrink-0 w-48">
            <FilterByStatusSelect category={validatedCategory} />
          </div>
        </div>
      )}
      <CarList cars={cars} />
      {hasCars && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          limit={sanitizedLimit}
          query={finalQuery}
          category={validatedCategory}
        />
      )}
    </main>
  );
}
