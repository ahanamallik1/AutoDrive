import { NextResponse } from "next/server";
import cars from "@/data/vehicles.json";
import { paginate } from "@/utils/paginationUtils";
import { searchAndFilterCars } from "@/utils/searchAndFilterUtils";

export async function GET(req: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const query = searchParams.get("query")?.toLowerCase() || "";
    const category =
      searchParams.get("category")?.toLowerCase() || "filter by status";
    // Filter cars based on search query
    const filteredCars = searchAndFilterCars(query, cars.data, category);
    // Get paginated data and total pages
    const { paginatedCars, totalPages } = paginate(filteredCars, page, limit);
    // Return paginated cars with page info
    const response = NextResponse.json({
      cars: paginatedCars,
      page,
      totalPages,
    });
    // we cache response for 60 seconds and revalidate after 120 seconds
    response.headers.set(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=120"
    );
    return response;
  } catch (error) {
    // Log and return a 500 error response on failure
    console.error("[API] /api/cars:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
