import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Logout({ setIsLoggedIn }) {
	const navigate = useNavigate();

	const showLogoutAlert = () => {
		Swal.fire({
			icon: "warning",
			title: "Warning",
			text: "Do you want to log out?",
			showCancelButton: true,
			confirmButtonText: "Yes, let me out!",
			cancelButtonText: "No, I want to stay",
		}).then((result) => {
			if (result.isConfirmed) {
				logout();
			}
		});
	};

	const logout = async () => {
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
	};
	return <button onClick={showLogoutAlert}> Log out</button>;
}

export default Logout;
