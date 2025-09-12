const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
	const token = req.cookies?.token;
	if (!token) {
		return res.status(401).json({ message: "Please log in" });
	}
	jwt.verify(token, process.env.jwtKey, (error, decoded) => {
		if (error) {
			return res.status(401).json({
				message: "Invalid or expired token. Please log in again",
			});
		}
		req.userData = decoded;
		next();
	});
};

module.exports = isAuthenticated;
