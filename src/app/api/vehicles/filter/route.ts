import { NextResponse } from "next/server";
import vehicleData from "@/data/vehicles.json";

// API handler to fetch filtered vehicle data based on condition
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    // Get condition from the query parameters
    const condition = searchParams.get("condition");

    let filteredVehicles = vehicleData.data;

    if (condition) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.condition.toLowerCase() === condition.toLowerCase()
      );
    }
    // Return filtered vehicle data with count
    return NextResponse.json({
      count: filteredVehicles.length,
      data: filteredVehicles,
    });
  } catch (error) {
    // Handle errors and return a failure response
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
