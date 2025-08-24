import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";
import { describe, it, expect, afterEach } from "vitest";
import { fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";

afterEach(() => {
  cleanup();
});

describe("App component", () => {
  it("renders main page heading", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText("The main page")).toBeInTheDocument();
  });

  it("opens ControledForm when 'Open Controlled Form' button is clicked", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.queryByText(/Controled Form/i)).toBeNull();

    const btn = screen.getByRole("button", { name: /Open Controlled Form/i });
    fireEvent.click(btn);

    expect(screen.getByText(/Controled Form/i)).toBeInTheDocument();
  });
});
