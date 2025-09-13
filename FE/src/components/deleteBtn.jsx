import axios from "axios";
import Swal from "sweetalert2";

function DeleteBtn({ wishId, setRefreshToggle }) {
	const showDeleteAlert = () => {
		Swal.fire({
			icon: "warning",
			title: "Warning",
			text: "Do you want to delete this wish?",
			showCancelButton: true,
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
			console.log(error);
		}
	};
	return (
		<button onClick={showDeleteAlert} className="deleteBtn">
			{" "}
			Delete
		</button>
	);
}

export default DeleteBtn;
