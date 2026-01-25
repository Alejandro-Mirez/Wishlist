import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

beforeEach(() => {
	jest.clearAllMocks();
});

jest.mock("axios");

describe("App", () => {
	test("shows loading message before auth check resolves", () => {
		axios.get.mockReturnValue(new Promise(() => {}));
		render(<App />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});
});

test("checks auth on app mount", async () => {
	axios.get.mockResolvedValueOnce({ data: {} });
	render(<App />);
	await waitFor(() => {
		expect(axios.get).toHaveBeenCalledTimes(1);
	});
	expect(axios.get).toHaveBeenCalledWith("http://localhost:3002/dashboard", {
		withCredentials: true,
	});
});

describe("auth flow", () => {
	test("redirects unauthenticated users to the login page", async () => {
		axios.get.mockRejectedValueOnce(new Error("Unauthorized"));
		window.history.pushState({}, "", "/");
		render(<App />);
		expect(
			await screen.findByRole("heading", { name: /log in/i })
		).toBeInTheDocument();
	});
	test("renders the dashboard for authenticated users", async () => {
		axios.get.mockResolvedValueOnce({ data: {} });
		window.history.pushState({}, "", "/");
		render(<App />);
		expect(
			await screen.findByText(/You're logged in/i)
		).toBeInTheDocument();
	});
});

describe("routing", () => {
	test("shows a not found message for unknown routes", async () => {
		axios.get.mockResolvedValueOnce({ data: {} });
		window.history.pushState({}, "", "/random");
		render(<App />);
		expect(await screen.findByText(/Not found/i)).toBeInTheDocument();
	});
});
