import Logout from "./logout";
import Wishlist from "./wishlist";
import { useState, useEffect } from "react";
import axios from "axios";
import AddWish from "./addWishForm";

function Dashboard({ setIsLoggedIn }) {
	const [yourWishes, setYourWishes] = useState([]);
	const [otherWishes, setOtherWishes] = useState([]);
	const [showAddWishForm, setShowAddWishForm] = useState(false);
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

	const handleAddWish = async (formData) => {
		const userId = localStorage.getItem("userId");
		const newWish = formData.get("newWish");
		try {
			await axios.post(
				"http://localhost:3002/wishes/",
				{ newWish, userId },
				{
					withCredentials: true,
				}
			);
			setShowAddWishForm(false);
			setRefreshToggle((refreshToggle) => !refreshToggle);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Wishlist
				yourWishes={yourWishes}
				otherWishes={otherWishes}
				setRefreshToggle={setRefreshToggle}
			/>
			{!showAddWishForm && (
				<button onClick={() => setShowAddWishForm(true)}>
					Add new wish
				</button>
			)}

			{showAddWishForm && (
				<AddWish
					onAddWish={handleAddWish}
					onCancel={() => setShowAddWishForm(false)}
				/>
			)}
			<Logout setIsLoggedIn={setIsLoggedIn} />
		</div>
	);
}

export default Dashboard;
