"use client";

import { buttonClass, getVisiblePages } from "@/utils/paginationUtils";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  query: string;
  category: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  limit,
  query,
  category,
}) => {
  const pageNumbers = getVisiblePages(currentPage, totalPages);

  const getHref = (page: number) =>
    `/?page=${page}&limit=${limit}&query=${query}&category=${category}`;

  return (
    <nav
      aria-label="Pagination Navigation"
      className="fixed bottom-0 right-0 z-50 bg-white shadow-lg p-3 rounded-md"
    >
      <ul className="flex items-center space-x-2">
        {/* Previous Button */}
        {currentPage > 1 && (
          <li>
            <Link href={getHref(currentPage - 1)} passHref legacyBehavior>
              <a
                className={buttonClass(false)}
                aria-label="Go to previous page"
              >
                Previous
              </a>
            </Link>
          </li>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <Link href={getHref(page)} passHref legacyBehavior>
              <a
                className={buttonClass(page === currentPage)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </a>
            </Link>
          </li>
        ))}

        {/* Next Button */}
        {currentPage < totalPages && (
          <li>
            <Link href={getHref(currentPage + 1)} passHref legacyBehavior>
              <a className={buttonClass(false)} aria-label="Go to next page">
                Next
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
