import DeleteBtn from "./deleteBtn";
import UserWishes from "./userWishes";
import Wish from "./wish";
import EditWish from "./editWishForm";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import AddWish from "./addWishForm";
import ShoppingList from "./shoppingList";

function Wishlist({ yourWishes, otherWishes, setRefreshToggle }) {
	const userId = localStorage.getItem("userId");
	const [editingWishId, setEditingWishId] = useState(null);
	const [showAddWishForm, setShowAddWishForm] = useState(false);
	const [showUserWishes, setShowUserWishes] = useState(null);

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
		<div
			className={
				showUserWishes ? "wishlistContainer blur" : "wishlistContainer"
			}
		>
			<div className="wishes otherWishes">
				<h2 className="title">Gift Group</h2>
				<div>
					{Object.entries(groupedWishes).map(([owner, wishes]) => (
						<div key={owner} className="userList">
							<h3
								tabIndex={0}
								className="owner"
								onClick={() => setShowUserWishes(owner)}
								onKeyUp={(e) => {
									if (
										e.code === "Enter" ||
										e.code === "Space"
									) {
										setShowUserWishes(owner);
									}
								}}
							>
								{owner}
							</h3>

							{showUserWishes === owner && (
								<UserWishes
									owner={owner}
									wishes={wishes}
									userId={userId}
									setRefreshToggle={setRefreshToggle}
									onExit={() => {
										setShowUserWishes(null);
									}}
								/>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="yourPart">
				<div className="yourWishes">
					<h2 className="title">Your Wishes</h2>
					{!showAddWishForm && (
						<button
							onClick={() => setShowAddWishForm(true)}
							className="addBtn"
						>
							<img
								src="http://localhost:5173/add.svg"
								alt="Add"
							/>
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
							<div key={wish._id} className="yourWish">
								{editingWishId !== wish._id && (
									<Wish name={wish.wish} takenBy="" />
								)}
								<div>
									<div className="controls">
										{editingWishId !== wish._id && (
											<button
												onClick={() =>
													showEditAlert(wish._id)
												}
											>
												<img
													src={
														"http://localhost:5173/edit.svg"
													}
													alt="Edit"
												/>
											</button>
										)}
										{editingWishId !== wish._id && (
											<DeleteBtn
												wishId={wish._id}
												setRefreshToggle={
													setRefreshToggle
												}
											/>
										)}
									</div>

									{editingWishId === wish._id && (
										<EditWish
											onEditWish={handleEditWish}
											onCancel={() =>
												setEditingWishId(null)
											}
											wishId={wish._id}
											currentWish={wish.wish}
										/>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<ShoppingList groupedWishes={groupedWishes} userId={userId} />
			</div>
		</div>
	);
}

export default Wishlist;
