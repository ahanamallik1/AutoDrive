import { render, screen, fireEvent } from "@testing-library/react";
import FilterComponent from "@/components/FilterComponent";

describe("FilterComponent", () => {
  test("renders with the default option selected", () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterComponent onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText("Select All Cars")).toBeInTheDocument();
  });

  test("calls onFilterChange with the correct value when an option is selected", () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterComponent onFilterChange={mockOnFilterChange} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "new" },
    });
    expect(mockOnFilterChange).toHaveBeenCalledWith("new");
  });

  test("calls onFilterChange with the correct value for 'used' option", () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterComponent onFilterChange={mockOnFilterChange} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "used" },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith("used");
  });
});
