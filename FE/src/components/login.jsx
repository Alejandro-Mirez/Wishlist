import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

function Login({ setIsLoggedIn }) {
	const navigate = useNavigate();

	const [visibleU, setVisibleU] = useState(false);
	const [visibleP, setVisibleP] = useState(false);

	async function login(formData) {
		const username = formData.get("username").trim();
		const password = formData.get("password").trim();
		try {
			const raw = await axios.post(
				"http://localhost:3002/auth/login",
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
				title: "Welcome back!",
				timer: 800,
				showConfirmButton: false,
			}).then(() => navigate("/"));
		} catch (error) {
			console.log(error);
			switch (error.status) {
				case 400:
				case 401:
					Swal.fire(error.response.data.message);
					break;
				case 404:
					Swal.fire(error.response.data.message);
					navigate("/signup");
					break;
				case 500:
					Swal.fire(error.response.data.message);
					break;
				default:
					return <h3> Unexpected error </h3>;
			}
		}
	}

	return (
		<div className="container">
			<h1 className> Log in</h1>
			<form action={login} className="form">
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
					Password{" "}
					<b
						onMouseEnter={() => setVisibleP(true)}
						onMouseLeave={() => setVisibleP(false)}
					>
						*
					</b>
					{visibleP && <b> required</b>}
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					placeholder="password"
				></input>
				<button type="submit">Log in</button>
			</form>
			<h3>
				Don't have an account? <Link to="/signup"> Sign up</Link>
			</h3>
		</div>
	);
}

export default Login;
