import { NextResponse } from "next/server";
import { Vehicle } from "@/types/types";
import vehicleData from "@/data/vehicles.json";

// API handler to fetch a specific vehicle based on slug
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    // Validate the slug format
    if (typeof slug !== "string") {
      return new NextResponse(
        JSON.stringify({ error: "Invalid slug format" }),
        {
          status: 400,
        }
      );
    }

    // Split the slug into parts based on hyphen
    const parts = slug.split("-");

    // Ensure the slug contains at least 3 parts: brand, model, and year
    if (parts.length < 3) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid slug format" }),
        {
          status: 400,
        }
      );
    }

    // Extract the year (last part)
    const year = parts.pop();

    // Extract potential brand and model
    let brand = "";
    let model = "";

    // A normalized function for comparison
    const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

    // Loop through parts to identify the correct brand and model
    for (let i = 1; i < parts.length; i++) {
      const potentialBrand = parts.slice(0, i).join("-");
      const potentialModel = parts.slice(i).join("-");

      // Check if a vehicle with this brand and model exists in the data
      const vehicle = vehicleData.data.find(
        (v: Vehicle) =>
          normalize(v.brand) === normalize(potentialBrand) &&
          normalize(v.model) === normalize(potentialModel)
      );

      if (vehicle) {
        brand = potentialBrand;
        model = potentialModel;
        break;
      }
    }
    // Ensure the extracted brand, model, and year are valid
    if (!brand || !model || !year) {
      return new NextResponse(
        JSON.stringify({ error: "Missing vehicle details" }),
        {
          status: 400,
        }
      );
    }
    // Find the matching vehicle from the data
    const vehicle = vehicleData.data.find(
      (v: Vehicle) =>
        normalize(v.brand) === normalize(brand) &&
        normalize(v.model) === normalize(model) &&
        v.year.toString() === year
    );
    // Return the vehicle if found, otherwise error response
    if (!vehicle) {
      return new NextResponse(JSON.stringify({ error: "Vehicle not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(vehicle), { status: 200 });
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch vehicle data" }),
      { status: 500 }
    );
  }
}
