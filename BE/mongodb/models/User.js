const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Username required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password required"],
			minLength: [8, "Password must be at least 8 characters long"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
