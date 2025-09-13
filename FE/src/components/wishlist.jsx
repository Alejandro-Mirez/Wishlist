import DeleteBtn from "./deleteBtn";
import Wish from "./wish";
import ReleaseBtn from "./releaseBtn";
import TakeBtn from "./takeBtn";
import EditWish from "./editWishForm";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import AddWish from "./addWishForm";

function Wishlist({ yourWishes, otherWishes, setRefreshToggle }) {
	const userId = localStorage.getItem("userId");
	const [editingWishId, setEditingWishId] = useState(null);
	const [showAddWishForm, setShowAddWishForm] = useState(false);

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
			setEditingWishId(null);
		} catch (error) {
			console.log(error);
			Swal.fire("An unexpected error occurred, please try again later");
		}
	};

	const showEditAlert = (wishId) => {
		Swal.fire({
			icon: "warning",
			title: "Warning",
			text: "If your wish has been taken, it will be released after editing",
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				setEditingWishId(wishId);
			}
		});
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
			Swal.fire("An unexpected error occurred, please try again later");
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
			Swal.fire("An unexpected error occurred, please try again later");
		}
	};

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
		<div className="wishlistContainer">
			<div className="wishes otherWishes">
				<h2 className="title">Other Wishes</h2>
				{Object.entries(groupedWishes).map(([owner, wishes]) => (
					<div key={owner} className="userWishes">
						<h3 className="owner">{owner}</h3>
						<div>
							{wishes.map((wish) => (
								<div key={wish._id} className="oneWish">
									<Wish
										name={wish.wish}
										takenBy={
											wish.takenBy?._id === userId
												? "you"
												: wish.takenBy?.username
										}
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
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="wishes yourWishes">
				<h2 className="title">Your Wishes</h2>
				{!showAddWishForm && (
					<button
						onClick={() => setShowAddWishForm(true)}
						className="addBtn"
					>
						Add new wish
					</button>
				)}

				{showAddWishForm && (
					<AddWish
						onAddWish={handleAddWish}
						onCancel={() => setShowAddWishForm(false)}
					/>
				)}
				<div className="yourWishlist">
					{yourWishes.map((wish) => (
						<div key={wish._id} className="oneWish">
							{editingWishId !== wish._id && (
								<Wish name={wish.wish} takenBy="" />
							)}
							{editingWishId !== wish._id && (
								<button onClick={() => showEditAlert(wish._id)}>
									Edit
								</button>
							)}

							{editingWishId === wish._id && (
								<EditWish
									onEditWish={handleEditWish}
									onCancel={() => setEditingWishId(null)}
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
				</div>
			</div>
		</div>
	);
}

export default Wishlist;
