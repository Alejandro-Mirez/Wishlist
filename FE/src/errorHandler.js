import Swal from "sweetalert2";

export function handleError(error) {
	console.log(error);
	switch (error.status) {
		case 400:
		case 401:
		case 404:
		case 500:
			Swal.fire({
				title: error.response.data.message,
				timer: 2000,
				timerProgressBar: false,
				showConfirmButton: false,
				heightAuto: false,
			});

			break;

		default:
			Swal.fire({
				title: error.message,
				text: "Please try again later",
				timer: 2000,
				timerProgressBar: false,
				showConfirmButton: false,
				heightAuto: false,
			});
	}
}
