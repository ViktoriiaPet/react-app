import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ClientsForm from "../componets/clientsForm";
import userReducer from "../feathures/formSubmit";
import { expect, describe, it } from "vitest";

describe("ClientsForm component", () => {
  it("renders users correctly", () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          users: [
            {
              name: "Alice",
              email: "alice@test.com",
              age: 25,
              sex: "Female",
              password: "Aa1!aa",
              passwordRepit: "Aa1!aa",
              terms: true,
              image: "aGVsbG8=",
              country: "Honduras",
            },
          ],
        },
      },
    });

    render(
      <Provider store={store}>
        <ClientsForm />
      </Provider>,
    );

    expect(screen.getByText(/Clients/i)).toBeInTheDocument();

    expect(screen.getByText(/Name: Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: alice@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 25/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Female/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: Honduras/i)).toBeInTheDocument();

    expect(screen.getByAltText("clients image")).toBeInTheDocument();
  });
});
