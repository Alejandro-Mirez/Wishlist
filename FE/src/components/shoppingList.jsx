function ShoppingList({ groupedWishes, userId }) {
	return (
		<div className="shoppingList">
			<h2 className="title">Shopping list</h2>

			{Object.entries(groupedWishes).map(([owner, wishes]) => {
				const takenWishes = wishes.filter(
					(wish) => wish.takenBy?._id === userId
				);
				if (takenWishes.length === 0) return null;

				return (
					<div key={owner} className="ownerContainer">
						<h3 className="ownerList">For: {owner}</h3>

						<div>
							{takenWishes.map((wish) => (
								<ul key={wish._id}>
									<li>{wish.wish}</li>
								</ul>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ShoppingList;
