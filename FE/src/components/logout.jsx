import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout({ setIsLoggedIn }) {
	const navigate = useNavigate();
	async function logout() {
		try {
			await axios.post(
				"http://localhost:3002/auth/logout",
				{},
				{
					withCredentials: true,
				}
			);
			setIsLoggedIn(false);
			localStorage.removeItem("userId");
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	}
	return <button onClick={logout}> Log out</button>;
}

export default Logout;
