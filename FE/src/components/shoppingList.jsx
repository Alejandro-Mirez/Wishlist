function ShoppingList({ groupedWishes, userId, onToggleWish }) {
	return (
		<div className="shoppingList">
			<h2 className="title">Shopping list</h2>

			{Object.entries(groupedWishes).map(([owner, wishes]) => {
				const takenWishes = wishes.filter(
					(wish) => wish.takenBy?._id === userId
				);
				if (!takenWishes.length) return null;

				return (
					<div key={owner} className="ownerContainer">
						<h3 className="ownerList">For: {owner}</h3>

						{takenWishes.map((wish) => (
							<button
								key={wish._id}
								onClick={() => onToggleWish(wish._id)}
								className={wish.done ? "crossed" : ""}
							>
								{wish.wish}
							</button>
						))}
					</div>
				);
			})}
		</div>
	);
}

export default ShoppingList;
