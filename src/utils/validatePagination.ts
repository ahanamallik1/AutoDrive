// Default values for pagination
export const DEFAULT_PAGE = 1; // Default page number if no page is specified
export const DEFAULT_LIMIT = 5; // Default limit for items per page
export const MAX_LIMIT = 100; // Maximum limit for items per page

export const sanitizeLimit = (limit: number) => {
  if (isNaN(limit) || limit <= 0) return DEFAULT_LIMIT;
  return Math.min(limit, MAX_LIMIT);
};

export const sanitizePage = (page: number) => {
  if (isNaN(page) || page <= 0) return DEFAULT_PAGE;
  return page;
};

export const handleInvalidPage = (page: number, totalPages: number) => {
  if (page > totalPages && totalPages > 0) {
    // If page exceeds total pages and totalPages is positive
    return true; // Invalid page
  }
  return false; // Valid page
};
