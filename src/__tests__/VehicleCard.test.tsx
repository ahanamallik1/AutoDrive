import { render, screen } from "@testing-library/react";
import VehicleCard from "../components/VehicleCard";
import { Vehicle } from "../types/types";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

const mockVehicle: Vehicle = {
  brand: "Tesla",
  model: "Model S",
  year: 2021,
  price: 79999,
  condition: "New",
  images: [],
  range_km: 0,
  color: "",
  battery_capacity_kWh: 0,
  charging_speed_kW: 0,
  seats: 0,
  drivetrain: "",
  location: "",
  autopilot: false,
  kilometer_count: 0,
  accidents: false,
};

describe("VehicleCard", () => {
  test("renders VehicleCard component with correct data", () => {
    render(<VehicleCard vehicle={mockVehicle} />);
    expect(screen.getByText(/Tesla/i)).toBeInTheDocument();
    expect(screen.getByText(/Model S/i)).toBeInTheDocument();
    expect(screen.getByText(/2021/i)).toBeInTheDocument();
    expect(screen.getByText(/79999 €/i)).toBeInTheDocument();
    expect(screen.getByText(/New/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Tesla Model S/i)).toBeInTheDocument();
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
  });

  test("renders link with correct href", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const linkElement = screen.getByRole("link", {
      name: /view details/i,
    });
    expect(linkElement).toHaveAttribute("href", "/vehicles/tesla-model s-2021");
  });

  test("renders with correct CSS classes", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const cardElement = screen.getByText(/Tesla/i).closest("div");
    expect(cardElement).toHaveClass(
      "flex",
      "flex-col",
      "p-6",
      "border",
      "border-gray-300",
      "rounded-lg",
      "shadow-lg",
      "bg-white",
      "text-black",
      "hover:shadow-xl",
      "transition-shadow",
      "duration-300"
    );

    const buttonElement = screen.getByRole("button", {
      name: /view details/i,
    });
    expect(buttonElement).toHaveClass(
      "bg-black",
      "text-white",
      "px-4",
      "py-2",
      "rounded-lg",
      "hover:bg-gray-800",
      "transition",
      "duration-300"
    );
  });
});
