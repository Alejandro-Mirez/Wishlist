import Logout from "./logout";
import Wishlist from "./wishlist";
import { useState, useEffect } from "react";
import axios from "axios";

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
			}
		};
		getWishlist();
	}, [refreshToggle]);

	return (
		<div>
			<Logout setIsLoggedIn={setIsLoggedIn} />
			<Wishlist
				yourWishes={yourWishes}
				otherWishes={otherWishes}
				setRefreshToggle={setRefreshToggle}
			/>
		</div>
	);
}

export default Dashboard;
