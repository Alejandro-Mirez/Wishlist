import axios from "axios";

function DeleteBtn({ wishId, setRefreshToggle }) {
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
	return <button onClick={handleDeleteWish}> Delete</button>;
}

export default DeleteBtn;
