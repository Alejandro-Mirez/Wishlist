import { useRef } from "react";

function EditWish({ onEditWish, wishId, currentWish }) {
	const inputRef = useRef(null);
	const handleSubmit = (formData) => {
		const editedWish = formData.get("editedWish");
		onEditWish(editedWish, wishId);
	};
	const handleCancel = () => {
		if (inputRef.current) {
			inputRef.current.value = currentWish;
		}
	};
	return (
		<div>
			<form action={handleSubmit}>
				<label htmlFor="editedWish"> Edit your wish </label>
				<input
					type="text"
					id="editedWish"
					name="editedWish"
					placeholder="I wish for..."
					required
					defaultValue={currentWish}
					ref={inputRef}
				/>
				<button type="submit"> Ok</button>
				<button type="button" onClick={handleCancel}>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default EditWish;
