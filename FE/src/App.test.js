import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

describe("App", () => {
	test("shows loading message before auth check resolves", () => {
		axios.get.mockReturnValue(new Promise(() => {}));

		render(<App />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});
});
