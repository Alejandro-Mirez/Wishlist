const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.jwtKey, {
		expiresIn: "3d",
	});
};

module.exports = generateToken;
