function ReleaseBtn({ onRelease, wishId }) {
	const handleSubmit = () => {
		onRelease(wishId);
	};
	return <button onClick={handleSubmit}> Release </button>;
}

export default ReleaseBtn;
