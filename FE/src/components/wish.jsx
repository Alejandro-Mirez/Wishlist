function Wish({ name, takenBy }) {
	return (
		<div>
			<p className="wishName">{name}</p>
			<p className="state">
				{takenBy ? "wish taken by: " + takenBy : ""}
			</p>
		</div>
	);
}

export default Wish;
