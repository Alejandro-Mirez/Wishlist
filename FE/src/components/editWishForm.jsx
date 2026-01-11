import { useRef } from "react";

function EditWish({ onEditWish, wishId, currentWish, onCancel }) {
	const inputRef = useRef(null);
	const handleSubmit = (formData) => {
		const editedWish = formData.get("editedWish");
		onEditWish(editedWish, wishId);
	};

	const handleCancel = () => {
		if (inputRef.current) {
			inputRef.current.value = currentWish;
		}
		if (onCancel) onCancel();
	};
	return (
		<div className="editContainer">
			<form action={handleSubmit} className="editForm">
				<label htmlFor="editedWish" className="editLabel">
					Edit your wish
				</label>
				<div className="inputs">
					<input
						type="text"
						id="editedWish"
						name="editedWish"
						placeholder="I wish for..."
						required
						defaultValue={currentWish}
						ref={inputRef}
						autoFocus
					/>
					<div className="editControls">
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

export default EditWish;
