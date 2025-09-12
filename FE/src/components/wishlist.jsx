import DeleteBtn from "./deleteBtn";
import Wish from "./wish";
import ReleaseBtn from "./releaseBtn";
import TakeBtn from "./takeBtn";
import EditWish from "./editWishForm";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function Wishlist({ yourWishes, otherWishes, setRefreshToggle }) {
	const userId = localStorage.getItem("userId");
	const [showEditWishForm, setShowEditWishForm] = useState(false);

	const groupedWishes = otherWishes.reduce((acc, wish) => {
		const owner = wish.owner.username;
		if (!acc[owner]) {
			acc[owner] = [];
		}
		acc[owner].push(wish);
		return acc;
	}, {});

	const handleEditWish = async (editedWish, wishId) => {
		try {
			await axios.put(
				`http://localhost:3002/wishes/${wishId}`,
				{ editedWish },
				{
					withCredentials: true,
				}
			);
			setRefreshToggle((refreshToggle) => !refreshToggle);
			setShowEditWishForm(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTake = async (wishId) => {
		try {
			await axios.put(
				`http://localhost:3002/wishes/${wishId}/take`,
				{},

				{
					withCredentials: true,
				}
			);
			setRefreshToggle((refreshToggle) => !refreshToggle);
		} catch (error) {
			console.log(error);
		}
	};

	const handleRelease = async (wishId) => {
		try {
			await axios.put(
				`http://localhost:3002/wishes/${wishId}/free`,
				{},

				{
					withCredentials: true,
				}
			);
			setRefreshToggle((refreshToggle) => !refreshToggle);
		} catch (error) {
			console.log(error);
		}
	};

	const showEditAlert = () => {
		Swal.fire({
			icon: "warning",
			title: "Warning",
			text: "If your wish has been taken, it will be released after editing",
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				setShowEditWishForm(true);
			}
		});
	};

	return (
		<div>
			<h2>Your Wishes</h2>
			{yourWishes.map((wish) => (
				<div key={wish._id}>
					<Wish key={wish._id} name={wish.wish} takenBy="" />
					{!showEditWishForm && (
						<button onClick={() => showEditAlert()}>Edit</button>
					)}

					{showEditWishForm && (
						<EditWish
							onEditWish={handleEditWish}
							onCancel={() => setShowEditWishForm(false)}
							wishId={wish._id}
							currentWish={wish.wish}
						/>
					)}

					<DeleteBtn
						wishId={wish._id}
						setRefreshToggle={setRefreshToggle}
					/>
				</div>
			))}

			<h2>Other Wishes</h2>
			{Object.entries(groupedWishes).map(([owner, wishes]) => (
				<div key={owner}>
					<h3>{owner}</h3>
					<ul>
						{wishes.map((wish) => (
							<li key={wish._id}>
								<Wish
									name={wish.wish}
									takenBy={wish.takenBy?.username}
								/>
								{wish.state === "taken" &&
									wish.takenBy?._id === userId && (
										<ReleaseBtn
											onRelease={handleRelease}
											wishId={wish._id}
										/>
									)}
								{wish.state === "free" && (
									<TakeBtn
										onTake={handleTake}
										wishId={wish._id}
									/>
								)}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default Wishlist;
