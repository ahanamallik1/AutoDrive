import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateSearch } from "@/utils/validateSearch";

// Custom hook to synchronize a search input value with a URL query parameter.
export const useQuerySync = (searchTerm: string, paramName: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevSearchTermRef = useRef<string>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const validatedSearchTerm = validateSearch(searchTerm);

    if (searchTerm && validatedSearchTerm.length > 0) {
      params.set(paramName, validatedSearchTerm[0]);

      // Reset page only if searchTerm changed compared to previous value
      if (prevSearchTermRef.current !== searchTerm) {
        params.set("page", "1");
      }
    } else {
      params.delete(paramName);
      // Optionally reset page when search term is cleared
      if (prevSearchTermRef.current !== searchTerm) {
        params.set("page", "1");
      }
    }

    prevSearchTermRef.current = searchTerm;

    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [searchTerm, paramName, router, searchParams]);
};
