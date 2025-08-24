import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feathures/formSubmit";
import countriesReducer from "../feathures/countriesSlice";
import ContentUncontroledForm from "../componets/uncontroledForm";

const renderWithStore = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      countries: countriesReducer,
    },
    preloadedState: {
      user: { users: [] },
      countries: ["Honduras", "USA", "Germany"],
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Uncontrolled Form", () => {
  it("renders all inputs", () => {
    renderWithStore(<ContentUncontroledForm onClose={vi.fn()} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Age:" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Gender:" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Terms:" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Image:")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("shows error when submitting empty form", () => {
    renderWithStore(<ContentUncontroledForm onClose={vi.fn()} />);
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Enter the name/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter the correct email address/i),
    ).toBeInTheDocument();
  });

  it("submits valid data", () => {
    const onClose = vi.fn();
    renderWithStore(<ContentUncontroledForm onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "alice@test.com" },
    });

    const ageInput = screen.getAllByLabelText(/Age/i)[0];
    fireEvent.change(ageInput, { target: { value: "25" } });

    const passInput = screen.getAllByLabelText(/Password/i)[0];
    fireEvent.change(passInput, { target: { value: "Aa1!" } });

    fireEvent.change(screen.getByLabelText(/Confirm password/i), {
      target: { value: "Aa1!" },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: "Honduras" },
    });
    fireEvent.click(screen.getByLabelText(/Terms/i));
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: "Female" },
    });
    fireEvent.change(screen.getByLabelText(/Image/i), {
      target: { value: "aGVsbG8=" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(onClose).toHaveBeenCalled();
  });
});
