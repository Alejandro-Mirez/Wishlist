import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

function Signup({ setIsLoggedIn }) {
	const navigate = useNavigate();

	const [visibleU, setVisibleU] = useState(false);
	const [visibleP, setVisibleP] = useState(false);

	async function signup(formData) {
		const username = formData.get("username").trim();
		const password = formData.get("password").trim();
		try {
			const raw = await axios.post(
				"http://localhost:3002/auth/signup",
				{
					username,
					password,
				},
				{ withCredentials: true }
			);
			const response = JSON.parse(raw.request.response);
			localStorage.setItem("userId", response.userId);
			localStorage.setItem("username", username);
			setIsLoggedIn(true);
			Swal.fire({
				title: "Welcome!",
				timer: 800,
				showConfirmButton: false,
			}).then(() => navigate("/"));
		} catch (error) {
			switch (error.status) {
				case 400:
					Swal.fire(error.response.data.message);
					break;
				case 500:
					Swal.fire(error.response.data.message);
					break;
				default:
					Swal.fire(
						"An unexpected error occurred, please try again later"
					);
			}
		}
	}
	return (
		<div className="container">
			<div className="formContainer">
				<h1> Sign up</h1>
				<form action={signup} className="form">
					<label htmlFor="username">
						Username{" "}
						<b
							onMouseEnter={() => setVisibleU(true)}
							onMouseLeave={() => setVisibleU(false)}
						>
							*
						</b>
						{visibleU && <b> required</b>}
					</label>
					<input
						type="text"
						id="username"
						name="username"
						required
						placeholder="username"
						autoFocus
					></input>
					<label htmlFor="password">
						{" "}
						Password{" "}
						<b
							onMouseEnter={() => setVisibleP(true)}
							onMouseLeave={() => setVisibleP(false)}
						>
							*
						</b>
						{visibleP && <b> required</b>}{" "}
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						placeholder="password"
						minLength="8"
					></input>
					<button type="submit"> Sign up</button>
				</form>
				<h3>
					Already have an account? <Link to="/login">Log in</Link>
				</h3>
			</div>
		</div>
	);
}

export default Signup;
