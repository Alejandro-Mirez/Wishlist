import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
	const navigate = useNavigate();

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
			setIsLoggedIn(true);
			navigate("/");
		} catch (error) {
			console.log(error);
			switch (error.status) {
				case 400:
				case 401:
					alert(error.response.data.message);
					break;
				case 404:
					alert(error.response.data.message);
					navigate("/signup");
					break;
				case 500:
					alert(error.response.data.message);
					break;
				default:
					return <h3> Unexpected error </h3>;
			}
		}
	}

	return (
		<div>
			<h1> Log in</h1>
			<form action={login}>
				<label htmlFor="username"> Username </label>
				<input
					type="text"
					id="username"
					name="username"
					required
					placeholder="username"
				></input>
				<label htmlFor="password"> Password </label>
				<input
					type="password"
					id="password"
					name="password"
					required
					placeholder="password"
				></input>
				<button type="submit"> Log in</button>
			</form>
			<h3>
				Don't have an account? <Link to="/signup"> Sign up</Link>
			</h3>
		</div>
	);
}

export default Login;
