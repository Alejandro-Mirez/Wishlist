function TakeBtn({ onTake, wishId }) {
	const handleSubmit = () => {
		onTake(wishId);
	};
	return <button onClick={handleSubmit}> Take </button>;
}

export default TakeBtn;
