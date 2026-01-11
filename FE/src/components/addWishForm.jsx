import { useRef } from "react";

function AddWish({ onAddWish, onCancel }) {
	const inputRef = useRef(null);
	const handleCancel = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		if (onCancel) onCancel();
	};
	return (
		<div>
			<form action={onAddWish} className="form addWishForm">
				<label htmlFor="newWish" className="addLabel">
					Write your wish
				</label>
				<div className="inputs">
					<input
						type="text"
						id="newWish"
						name="newWish"
						required
						placeholder="I wish for..."
						ref={inputRef}
						autoFocus
					></input>
					<div className="addControls">
						<button type="submit" className="okBtn">
							<img
								src={"http://localhost:5173/ok.svg"}
								alt="Ok"
							/>
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="cancelBtn"
						>
							<img
								src={"http://localhost:5173/x.svg"}
								alt="Cancel"
							/>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddWish;
