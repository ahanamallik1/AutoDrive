import { Car } from "@/types/types";
import { sanitizeLimit, sanitizePage } from "./validatePagination";

export function paginate(data: Car[], page: number, limit: number) {
  const sanitizedPage = sanitizePage(page);
  const sanitizedLimit = sanitizeLimit(limit);

  const startIndex = (sanitizedPage - 1) * sanitizedLimit;
  const paginatedCars = data.slice(startIndex, startIndex + sanitizedLimit);

  const totalPages = Math.ceil(data.length / sanitizedLimit);

  return {
    paginatedCars,
    totalPages,
  };
}

export const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pageNumbers: number[] = [];
  const visiblePages = 3;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export const buttonClass = (active: boolean) =>
  `px-4 py-2 rounded-md border text-sm font-medium transition-colors duration-200
  ${
    active
      ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
  }`;
