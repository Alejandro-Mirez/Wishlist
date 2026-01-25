import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";
import axios from "axios";
import Swal from "sweetalert2";
import { handleError } from "../errorHandler";

beforeEach(() => {
	jest.clearAllMocks();
	window.localStorage.removeItem("username");
	window.localStorage.removeItem("userId");
});

jest.mock("axios");

jest.mock("sweetalert2", () => ({
	fire: jest.fn(() => Promise.resolve()),
}));

jest.mock("../errorHandler", () => ({
	handleError: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
}));

const renderAndLogin = async ({
	username,
	password,
	setIsLoggedIn = jest.fn(),
}) => {
	render(
		<MemoryRouter>
			<Login setIsLoggedIn={setIsLoggedIn} />
		</MemoryRouter>
	);

	fireEvent.change(screen.getByPlaceholderText("username"), {
		target: { value: username },
	});
	fireEvent.change(screen.getByPlaceholderText("password"), {
		target: { value: password },
	});

	fireEvent.click(screen.getByRole("button", { name: /log in/i }));

	return { setIsLoggedIn };
};

describe("Login", () => {
	test("trims user input", async () => {
		await renderAndLogin({ username: " myuser ", password: " mypass " });

		await waitFor(() => {
			expect(axios.post).toHaveBeenCalledWith(
				"http://localhost:3002/auth/login",
				{ username: "myuser", password: "mypass" },
				expect.any(Object) // for withCredentials
			);
		});
	});
});

describe("Login success", () => {
	test("sets username and userId as local storage items", async () => {
		axios.post.mockResolvedValueOnce({
			request: { response: JSON.stringify({ userId: "mock value" }) },
		});
		const { setIsLoggedIn } = await renderAndLogin({
			username: "myuser",
			password: "mypass",
		});
		await waitFor(() => {
			expect(localStorage.getItem("userId")).toBe("mock value");
			expect(localStorage.getItem("username")).toBe("myuser");
			expect(setIsLoggedIn).toHaveBeenCalledWith(true);
		});
	});

	test("fires welcome message", async () => {
		axios.post.mockResolvedValueOnce({
			request: { response: JSON.stringify({ userId: "mock value" }) },
		});
		await renderAndLogin({
			username: "myuser",
			password: "mypass",
		});
		await waitFor(() => {
			expect(Swal.fire).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Welcome back!",
				})
			);
		});
	});

	test("redirects to dashboard", async () => {
		axios.post.mockResolvedValueOnce({
			request: { response: JSON.stringify({ userId: "mock value" }) },
		});
		await renderAndLogin({
			username: "myuser",
			password: "mypass",
		});
		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});
});

describe("Login fail", () => {
	test("stays on login page", async () => {
		axios.post.mockRejectedValueOnce(new Error("Not Found"));

		await renderAndLogin({
			username: "nonexistinguser",
			password: "nonexistingpass",
		});
		await waitFor(() => {
			expect(mockNavigate).not.toHaveBeenCalled();
		});
	});
	test("fires error message", async () => {
		axios.post.mockRejectedValueOnce(new Error("Not Found"));

		await renderAndLogin({
			username: "nonexistinguser",
			password: "nonexistingpass",
		});

		await waitFor(() => {
			expect(handleError).toHaveBeenCalled();
		});
	});
});
