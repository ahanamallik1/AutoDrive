// src/app/api/cars/[id]/route.ts
import cars from "@/data/vehicles.json";
import { Car } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ msg: "Missing id" }, { status: 400 });

    const carId = parseInt(id, 10);
    if (isNaN(carId))
      return NextResponse.json({ msg: "Invalid id" }, { status: 400 });

    const car = cars.data.find((car: Car) => car.id === carId);
    if (!car)
      return NextResponse.json({ msg: "Car not found" }, { status: 404 });

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
