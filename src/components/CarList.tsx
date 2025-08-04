import { Car } from "@/types/types";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import CarCard
const CarCard = dynamic(() => import("./CarCard"), { ssr: false });

interface CarsProps {
  cars: Car[];
}

const CarList: React.FC<CarsProps> = ({ cars }) => {
  return (
    // Main section for displaying list of cars or fallback message
    <section aria-labelledby="car-list-heading" className="p-4 pb-24">
      {cars.length > 0 ? (
        // Render list of CarCard components if cars are available
        <ul role="list" className="flex flex-wrap gap-4 justify-start">
          {cars.map((car: Car, index) => (
            <li key={index} className="flex-shrink-0">
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      ) : (
        // Show message and link when no cars are available
        <p className="text-gray-600">
          No cars available or please search or filter with a valid input.
          <Link href="/" className="text-blue-600 underline">
            Go back to <strong>Cars</strong>
          </Link>
        </p>
      )}
    </section>
  );
};

export default CarList;
