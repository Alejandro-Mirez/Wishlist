function Wish({ name, takenBy }) {
	return (
		<div>
			<p>{name}</p>
			<p> {takenBy ? "wish taken by: " + takenBy : ""} </p>
		</div>
	);
}

export default Wish;
