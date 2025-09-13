import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await axios.get("http://localhost:3002/dashboard", {
					withCredentials: true,
				});
				setIsLoggedIn(true);
			} catch (error) {
				setIsLoggedIn(false);
				console.log(error);
			}
		};
		checkAuth();
	}, []);

	function RedirectToLogin() {
		const navigate = useNavigate();
		useEffect(() => {
			navigate("/login");
		}, [navigate]);
		return null;
	}

	if (isLoggedIn === null) {
		return <p>Loading...</p>;
	}

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						isLoggedIn ? (
							<Dashboard setIsLoggedIn={setIsLoggedIn} />
						) : (
							<RedirectToLogin />
						)
					}
				/>
				<Route
					path="/login"
					element={<Login setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route
					path="/signup"
					element={<Signup setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route
					path="*"
					element={
						<div> Not Found or You do not have permission.</div>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
