const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema(
	{
		wish: {
			type: String,
			required: [true, "Wish name required"],
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		state: {
			type: String,
			enum: ["free", "taken"],
			default: "free",
		},
		takenBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		done: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Wish", wishSchema);
