import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateCategory } from "@/utils/validateFilter";
//  Custom hook that synchronizes the `category` value with the URL search parameters.
export const useCategorySync = (category: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const validatedCategory = validateCategory(category);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    const currentCategory = currentParams.get("category");
    const currentPage = currentParams.get("page");

    const nextParams = new URLSearchParams(currentParams);

    // Set or delete category param
    if (validatedCategory) {
      nextParams.set("category", validatedCategory);
    } else {
      nextParams.delete("category");
    }

    // Reset to page=1 only if category actually changed
    if (validatedCategory !== currentCategory && currentPage !== "1") {
      nextParams.set("page", "1");
    }

    const nextQuery = nextParams.toString();
    const currentQuery = currentParams.toString();

    if (nextQuery !== currentQuery) {
      router.push(`/?${nextQuery}`, { scroll: false });
    }
  }, [validatedCategory, searchParams, router]);
};
