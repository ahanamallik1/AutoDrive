import { getCarDetails } from "@/lib/carDetailsApi";
import { notFound } from "next/navigation";
import CarImageSlider from "@/components/CarImageSlider";
import {
  MapPin,
  BatteryCharging,
  Zap,
  Users,
  Gauge,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import BackButton from "@/components/BackButton";
// import Link from "next/link";

const CarDetails = async ({ params }: { params: { id: string } }) => {
  const car = await getCarDetails(params.id);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900 pb-20">
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
        <BackButton className="inline-flex items-center justify-center mt-4 mb-6 ml-4 rounded-lg bg-emerald-600 px-5 py-2.5 text-white text-sm font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition">
          <ArrowLeft />
          Back to Cars
        </BackButton>
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold mb-2">
            {car.year} {car.brand} {car.model}
          </h1>
          <p className="text-2xl text-green-600 font-semibold">{car.price} €</p>
        </header>

        {/* Image Slider */}
        {car.images?.length > 0 && (
          <section aria-label="Car images">
            <CarImageSlider
              images={car.images}
              altText={`${car.brand} ${car.model}`}
            />
          </section>
        )}

        {/* Car Specifications */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-base"
          aria-label="Car specifications"
        >
          <div className="flex items-center gap-2">
            {car.condition === "New" ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <XCircle className="text-yellow-500" />
            )}
            <span>
              <strong>Condition:</strong> {car.condition}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="text-blue-500" />
            <span>
              <strong>Seats:</strong> {car.seats}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BatteryCharging className="text-purple-500" />
            <span>
              <strong>Battery:</strong> {car.battery_capacity_kWh} kWh
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="text-orange-500" />
            <span>
              <strong>Charging Speed:</strong> {car.charging_speed_kW} kW
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="text-red-500" />
            <span>
              <strong>Location:</strong> {car.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Gauge className="text-indigo-500" />
            <span>
              <strong>Range:</strong> {car.range_km} km
            </span>
          </div>
        </section>
      </article>
    </main>
  );
};

export default CarDetails;
