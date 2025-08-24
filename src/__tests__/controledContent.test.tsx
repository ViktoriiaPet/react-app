import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feathures/formSubmit";
import countriesReducer from "../feathures/countriesSlice";
import ModalContent from "../componets/controledContent";

vi.mock("../feathures/formSubmit", async (importOriginal) => {
  const actualModule: {
    addUser: (user: {
      name: string;
      email: string;
      password: string;
      passwordRepit: string;
      age: number;
      sex: "Male" | "Female" | "I don't now";
      terms: boolean;
      image: string;
      country: string;
    }) => void;
    default?: unknown;
  } = await importOriginal();

  return {
    ...actualModule,
    addUser: vi.fn(),
  };
});

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

describe("ModalContent Form", () => {
  it("renders all form fields", () => {
    renderWithStore(<ModalContent onClose={vi.fn()} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /Age/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Please repeat password/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Client's terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it("disables submit button if form is invalid", () => {
    renderWithStore(<ModalContent onClose={vi.fn()} />);
    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    expect(submitBtn).toBeDisabled();
  });

  it("calculates password strength correctly", () => {
    renderWithStore(<ModalContent onClose={vi.fn()} />);
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(passwordInput, { target: { value: "abc" } });
    expect(screen.getByText(/So silly|Silly/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "Abc123!" } });
    expect(screen.getByText(/Strength/i)).toBeInTheDocument();
  });
});
