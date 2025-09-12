const Wish = require("../mongodb/models/Wish");

const getWishes = async (req, res) => {
	try {
		const userId = req.userData?.id;
		if (userId) {
			const yourWishes = await Wish.find(
				{ owner: userId },
				"-state -takenBy"
			).populate("owner", "username");

			const otherWishes = await Wish.find({ owner: { $ne: userId } })
				.populate("owner", "username")
				.populate("takenBy", "username");

			res.status(200).json({
				message: "Wishes fetched successfully",
				yourWishes,
				otherWishes,
			});
		} else {
			return res.status(401).json({
				message: "Invalid or expired token. Please log in again",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: fetch wishes" });
	}
};

const addWish = async (req, res) => {
	try {
		const wish = req.body.newWish;
		const userId = req.userData?.id;
		if (userId) {
			const newWish = await Wish.create({
				wish,
				owner: userId,
			});
			return res
				.status(201)
				.json({ message: "Wish created successfully", newWish });
		} else {
			return res.status(401).json({
				message: "Invalid or expired token. Please log in again",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: add wish" });
	}
};

const deleteWish = async (req, res) => {
	const wishId = req.params.id;
	const userId = req.userData?.id;
	try {
		if (userId) {
			const deletedWish = await Wish.findOneAndDelete(
				{
					owner: userId,
					_id: wishId,
				},
				{ projection: { state: 0, takenBy: 0 } }
			);
			if (!deletedWish) {
				return res
					.status(404)
					.json({ message: "Wish not found or already deleted" });
			}

			return res
				.status(200)
				.json({ message: "Wish deleted successfully", deletedWish });
		} else {
			return res.status(401).json({
				message: "Invalid or expired token. Please log in again",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: delete wish" });
	}
};

const editWish = async (req, res) => {
	try {
		const wishId = req.params.id;
		const userId = req.userData?.id;
		const newWish = req.body.editedWish;
		if (userId) {
			const updatedWish = await Wish.findOneAndUpdate(
				{ owner: userId, _id: wishId },
				{ wish: newWish, takenBy: null, state: "free" },
				{ new: true }
			);
			return res
				.status(200)
				.json({ message: "Wish updated successfully", updatedWish });
		} else {
			return res.status(401).json({
				message: "Invalid or expired token. Please log in again",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: edit wish" });
	}
};

const takeWish = async (req, res) => {
	try {
		const wishId = req.params.id;
		const userId = req.userData?.id;
		if (userId) {
			const updatedWish = await Wish.findOneAndUpdate(
				{ _id: wishId },
				{ takenBy: userId, state: "taken" },
				{ new: true }
			);
			return res
				.status(200)
				.json({ message: "Wish taken successfully", updatedWish });
		} else {
			return res.status(401).json({
				message: "Invalid or expired token. Please log in again",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: take wish" });
	}
};

const freeWish = async (req, res) => {
	try {
		const wishId = req.params.id;
		const userId = req.userData?.id;
		if (userId) {
			const updatedWish = await Wish.findOneAndUpdate(
				{ _id: wishId },
				{ takenBy: null, state: "free" },
				{ new: true }
			);
			return res
				.status(200)
				.json({ message: "Wish released successfully", updatedWish });
		} else {
			return res.status(401).json({
				message: "Invalid or expired token. Please log in again",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: release wish" });
	}
};

module.exports = {
	getWishes,
	addWish,
	deleteWish,
	editWish,
	takeWish,
	freeWish,
};
