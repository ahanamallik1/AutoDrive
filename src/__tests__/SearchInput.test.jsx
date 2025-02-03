import SearchInput from "@/components/Search";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SearchInput", () => {
  test("renders the search input with placeholder and icon", () => {
    render(<SearchInput searchQuery="" handleSearch={() => {}} />);
    // Check for the input element with the placeholder
    const inputElement = screen.getByPlaceholderText(
      /Search Car by Brand \(Tesla\), Model, Year.../i
    );
    expect(inputElement).toBeInTheDocument();
  });

  test("calls handleSearch on input change", () => {
    const handleSearchMock = jest.fn();
    render(<SearchInput searchQuery="" handleSearch={handleSearchMock} />);

    // Simulate a user typing in the input field
    const inputElement = screen.getByPlaceholderText(
      /Search Car by Brand \(Tesla\), Model, Year.../i
    );
    fireEvent.change(inputElement, { target: { value: "Audi" } });
    expect(handleSearchMock).toHaveBeenCalled();
  });

  test("displays the correct search query in the input field", () => {
    const searchQuery = "Audi";
    render(<SearchInput searchQuery={searchQuery} handleSearch={() => {}} />);

    // Check if the input value matches the searchQuery prop
    const inputElement = screen.getByPlaceholderText(
      /Search Car by Brand \(Tesla\), Model, Year.../i
    );
    expect(inputElement).toHaveValue(searchQuery);
  });
});
