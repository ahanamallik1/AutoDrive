import { NextResponse } from "next/server";
import { VehicleResponse } from "@/types/types";
import vehicleData from "@/data/vehicles.json";

// API handler to fetch paginated vehicle data
export async function GET(req: Request) {
  try {
    // Get pagination parameters (page and limit) from the query string
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Cast the vehicle data as VehicleResponse type and slice the data for pagination
    const data: VehicleResponse = vehicleData as VehicleResponse;
    const paginatedData = data.data.slice(startIndex, endIndex);

    // Return paginated data in the response
    return NextResponse.json(
      {
        count: data.count,
        totalPages: Math.ceil(data.count / limit),
        currentPage: page,
        data: paginatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors and return a failure response
    console.error("Error fetching vehicle data:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle data" },
      { status: 500 }
    );
  }
}
