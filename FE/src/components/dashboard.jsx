import Logout from "./logout";
import Wishlist from "./wishlist";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Dashboard({ setIsLoggedIn }) {
	const [yourWishes, setYourWishes] = useState([]);
	const [otherWishes, setOtherWishes] = useState([]);

	const [refreshToggle, setRefreshToggle] = useState(false);

	useEffect(() => {
		const getWishlist = async () => {
			try {
				const raw = await axios.get("http://localhost:3002/wishes/", {
					withCredentials: true,
				});
				const response = JSON.parse(raw.request.response);
				setYourWishes(response.yourWishes);
				setOtherWishes(response.otherWishes);
			} catch (error) {
				console.log(error);
				Swal.fire(
					"An unexpected error occurred, please try again later"
				);
			}
		};
		getWishlist();
	}, [refreshToggle]);

	return (
		<div>
			<div className="heading">
				<Logout setIsLoggedIn={setIsLoggedIn} />
				<h1 className="pageTitle"> Wishlist</h1>
			</div>
			<Wishlist
				yourWishes={yourWishes}
				otherWishes={otherWishes}
				setRefreshToggle={setRefreshToggle}
			/>
		</div>
	);
}

export default Dashboard;
