import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { handleError } from "../errorHandler";

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
			heightAuto: false,
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
			handleError(error);
		}
	};
	const username = localStorage.getItem("username");
	return (
		<div>
			<button onClick={showLogoutAlert} className="logoutBtn">
				<img
					src={"http://localhost:5173/logout.svg"}
					alt="Logout"
					className="logoutIcon"
				/>
			</button>
			<p className="loggedInAs"> You're logged in as: {username} </p>
		</div>
	);
}

export default Logout;
