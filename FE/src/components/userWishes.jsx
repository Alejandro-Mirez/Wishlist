import Wish from "./wish";
import ReleaseBtn from "./releaseBtn";
import TakeBtn from "./takeBtn";
import axios from "axios";
import Swal from "sweetalert2";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { handleError } from "../errorHandler";

function UserWishes({ owner, userId, wishes, setRefreshToggle, onExit }) {
	const wrapperRef = useRef(null);
	const modalRef = useRef(null);

	useEffect(() => {
		if (!modalRef.current) return;
		const focusable = modalRef.current.querySelectorAll("button");
		let first = null;
		let last = null;
		if (focusable.length > 0) {
			first = focusable[0];
			last = focusable[focusable.length - 1];

			first.focus();
		}

		function handleClickOutside(event) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				onExit();
			}
		}

		function handleKeyDown(e) {
			if (e.key === "Escape") {
				onExit();
			}

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			}

			if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}

			if (focusable.length === 0 && e.key === "Tab") {
				e.preventDefault();
			}
		}
		document.addEventListener("pointerdown", handleClickOutside, true);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [wishes, onExit]);

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
			handleError(error);
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
			handleError(error);
		}
	};

	return createPortal(
		<div ref={wrapperRef} className="userWishesContainer">
			<div ref={modalRef} className="userWishes">
				<h3 className="owner modal">{owner}</h3>
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
