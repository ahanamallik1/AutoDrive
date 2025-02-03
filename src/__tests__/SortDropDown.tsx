import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // Adjust the path
import SortDropdown from "@/components/SortDropDown";

describe("SortDropdown", () => {
  test("renders with default option selected", () => {
    render(
      <Provider store={store}>
        <SortDropdown />
      </Provider>
    );

    expect(screen.getByDisplayValue("Year (ASC)")).toBeInTheDocument();
  });

  test("dispatches setSortOrder action on select change", async () => {
    render(
      <Provider store={store}>
        <SortDropdown />
      </Provider>
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "desc" },
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(store.getState().vehicles.sortOrder).toBe("desc");
  });
});
