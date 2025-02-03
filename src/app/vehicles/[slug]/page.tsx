"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicleDetails } from "@/store/vehicleDetailsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import {
  ArrowLeft,
  Car,
  BatteryCharging,
  MapPin,
  Shield,
  Gauge,
  Users,
  Box,
  Zap,
  CheckCircle,
  XCircle,
  Truck,
  Target,
} from "lucide-react";
import { useImageSlider } from "@/hook/useImageSlider";

export default function VehicleDetailsPage() {
  const { slug } = useParams(); // Get the vehicle slug from URL parameters
  const dispatch = useDispatch<AppDispatch>();
  const { vehicle } = useSelector((state: RootState) => state.vehicleDetails); // Get vehicle details from Redux state
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      // Dispatch the action to fetch vehicle details based on the slug
      dispatch(fetchVehicleDetails(slug as string));
    }
  }, [slug, dispatch]);

  const currentImageIndex = useImageSlider(vehicle?.images || []);

  if (!vehicle)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-white">
        Vehicle not found {/* Display message if no vehicle details found */}
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white transition-all p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-black bg-opacity-80 rounded-2xl shadow-xl overflow-hidden p-6 transition-all">
        {/* Back Button to navigate to the vehicles List */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-300 hover:text-blue-500 transition mb-6"
        >
          <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" /> Go Back to Cars
        </button>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Vehicle year brand */}
          <div className="lg:w-1/2 text-center lg:text-left mb-4 lg:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {vehicle.year} {vehicle.brand}
            </h1>
            {/* Vehicle price */}
            <p className="text-xl md:text-2xl font-semibold text-green-600 mb-1">
              {vehicle.price} €
            </p>
          </div>
          {/* Vehicle Image slider*/}
          <div className="relative flex-shrink-0 w-full lg:w-1/2 group overflow-hidden">
            {vehicle?.images && vehicle.images.length > 0 && (
              <Image
                src={vehicle.images[currentImageIndex]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                width={1000}
                height={600}
                className="rounded-xl object-cover w-full transition-transform transform group-hover:scale-110"
              />
            )}
          </div>
        </div>

        {/* Vehicle Location, Condition, Seats, and Model and other details */}
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4 text-lg text-gray-300 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* vehicle location */}
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            <strong>Location:</strong> {vehicle.location}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* vehicle condition (New or Used) */}
            <Car className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            <strong>Condition:</strong> {vehicle.condition}
          </div>
          <div className="flex items-center gap-2">
            {/* number of seats */}
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            <strong>Seats:</strong> {vehicle.seats}
          </div>
          <div className="flex items-center gap-2">
            {/* battery capacity */}
            <BatteryCharging className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            <strong>Battery Capacity:</strong> {vehicle.battery_capacity_kWh}{" "}
            kWh
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            {/* charging speed */}
            <strong>Charging Speed:</strong> {vehicle.charging_speed_kW} kW
          </div>
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            <strong>Model:</strong> {vehicle.model}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-lg text-gray-300 mt-4">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            {/* Drive train */}
            <strong>Drivetrain:</strong> {vehicle.drivetrain}
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            <strong>Range:</strong> {vehicle.range_km} km
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            <strong>Kilometer:</strong>
            {vehicle.kilometer_count > 0 ? (
              `${vehicle.kilometer_count} km`
            ) : (
              <span className="text-red-500">Not available</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            {/* autopilot availability */}
            {vehicle.autopilot ? (
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            )}
            <strong>Autopilot:</strong> {vehicle.autopilot ? "Yes" : "No"}
          </div>
          <div className="flex items-center gap-2">
            {/* accident history */}
            {vehicle.accidents ? (
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                <div>
                  <strong className="text-red-500">Accidents:</strong>
                  <span className="text-red-500 ml-2">
                    {vehicle.accident_description}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-green-500 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>No Accidents</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
