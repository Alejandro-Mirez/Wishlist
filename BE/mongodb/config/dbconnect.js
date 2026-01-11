const mongoose = require("mongoose");

const connectToDB = async (attempt = 1) => {
	console.log("...connecting...");
	try {
		await mongoose.connect(process.env.connectionString);
		console.log("Mongodb has been connected successfully");
	} catch (error) {
		console.log(error);
		if (attempt <= 3) {
			console.log(`...retry attempt no ", ${attempt}/3...`);
			setTimeout(() => connectToDB(attempt + 1), 3000);
		} else {
			console.log("3/3 retries not successful");
		}
	}
};

module.exports = connectToDB;
