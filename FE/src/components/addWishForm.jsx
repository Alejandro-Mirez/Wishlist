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
			<form action={onAddWish}>
				<label htmlFor="newWish"> Write your wish </label>
				<input
					type="text"
					id="newWish"
					name="newWish"
					required
					placeholder="I wish for..."
					ref={inputRef}
				></input>
				<button type="submit"> Ok</button>
				<button type="button" onClick={handleCancel}>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default AddWish;
