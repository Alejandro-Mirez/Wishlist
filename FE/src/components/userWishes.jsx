import Wish from "./wish";
import ReleaseBtn from "./releaseBtn";
import TakeBtn from "./takeBtn";
import axios from "axios";
import Swal from "sweetalert2";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

function UserWishes({ owner, userId, wishes, setRefreshToggle, onExit }) {
	const wrapperRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				onExit();
			}
		}

		document.addEventListener("pointerdown", handleClickOutside, true);
		return () =>
			document.removeEventListener(
				"pointerdown",
				handleClickOutside,
				true
			);
	}, [onExit]);
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

	return createPortal(
		<div ref={wrapperRef} className="userWishesContainer">
			<div className="userWishes">
				<h3 className="owner">{owner}</h3>
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
							<TakeBtn onTake={handleTake} wishId={wish._id} />
						)}
					</div>
				))}
			</div>
		</div>,
		document.getElementById("portal")
	);
}

export default UserWishes;
