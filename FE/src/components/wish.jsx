function Wish({ name, takenBy }) {
	return (
		<>
			<p className="wishName">{name}</p>

			{takenBy ? (
				<p className="state"> wish taken by: {takenBy} </p>
			) : (
				<p className="state placeholder"> free wish </p>
			)}
		</>
	);
}

export default Wish;
