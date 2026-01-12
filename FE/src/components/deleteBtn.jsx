import axios from "axios";
import Swal from "sweetalert2";
import { handleError } from "../errorHandler";

function DeleteBtn({ wishId, setRefreshToggle }) {
	const showDeleteAlert = () => {
		Swal.fire({
			icon: "warning",
			title: "Warning",
			text: "Do you want to delete this wish?",
			showCancelButton: true,
			heightAuto: false,
		}).then((result) => {
			if (result.isConfirmed) {
				handleDeleteWish();
			}
		});
	};

	const handleDeleteWish = async () => {
		try {
			await axios.delete(`http://localhost:3002/wishes/${wishId}`, {
				withCredentials: true,
			});

			setRefreshToggle((refreshToggle) => !refreshToggle);
		} catch (error) {
			handleError(error);
		}
	};
	return (
		<button onClick={showDeleteAlert} className="delBtn">
			<img src={"http://localhost:5173/delete.svg"} alt="Delete" />
		</button>
	);
}

export default DeleteBtn;
