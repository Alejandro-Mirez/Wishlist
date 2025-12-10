function Wish({ name, takenBy }) {
	return (
		<>
			<p className="wishName">{name}</p>
			<p className="state">
				{takenBy ? "wish taken by: " + takenBy : ""}
			</p>
		</>
	);
}

export default Wish;
