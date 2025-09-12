const mongoose = require("mongoose");

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.connectionString);
		console.log("Mongodb has been connected successfully");
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectToDB;
