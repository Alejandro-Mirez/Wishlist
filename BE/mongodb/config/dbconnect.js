const mongoose = require("mongoose");

const connectToDB = async (attempt = 1) => {
	console.log("...connecting...");
	try {
		await mongoose.connect(process.env.connectionString);
		console.log("Mongodb has been connected successfully");
	} catch (error) {
		console.log(error);
		if (attempt <= 3) {
			console.log(`...retry attempt no ", ${attempt}...`);
			setTimeout(() => connectToDB(attempt + 1), 3000);
		}
	}
};

module.exports = connectToDB;
