// import { NextResponse } from "next/server";
// import cars from "@/data/vehicles.json";
// import { Car } from "@/types/types";

// export async function GET() {
//   try {
//     const carSuggestions = cars.data.map((car: Car) => ({
//       id: car.id,
//       brand: car.brand,
//     }));

//     return NextResponse.json({ cars: carSuggestions }, { status: 200 });
//   } catch (error) {
//     console.error("[API] /api/cars/brands:", error);

//     return NextResponse.json(
//       { message: "Something went wrong." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import cars from "@/data/vehicles.json";
import { Car } from "@/types/types";

export async function GET() {
  try {
    // Create a Map to keep unique brands keyed by brand name
    const uniqueBrandsMap = new Map<string, { id: string; brand: string }>();

    for (const car of cars.data as Car[]) {
      if (!uniqueBrandsMap.has(car.brand.toLowerCase())) {
        uniqueBrandsMap.set(car.brand.toLowerCase(), {
          id: car.id.toString(),
          brand: car.brand,
        });
      }
    }

    // Convert map values to array
    const carSuggestions = Array.from(uniqueBrandsMap.values());

    return NextResponse.json({ cars: carSuggestions }, { status: 200 });
  } catch (error) {
    console.error("[API] /api/cars/brands:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
