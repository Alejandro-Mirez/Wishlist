const User = require("../mongodb/models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "Username and password required" });
		}

		if (password.length < 8) {
			return res.status(400).json({
				message: "Password must be at least 8 characters long",
			});
		}

		const userExists = await User.findOne({ username });
		if (userExists) {
			return res.status(400).json({
				message: "Username already taken, please choose another one",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			username,
			password: hashedPassword,
		});

		const token = generateToken(newUser._id);

		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000,
		})
			.status(201)
			.json({ message: "User created", userId: newUser._id });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: register user" });
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "Username and password required" });
		}

		const userFound = await User.findOne({
			username,
		});

		if (userFound && (await bcrypt.compare(password, userFound.password))) {
			const token = generateToken(userFound._id);

			res.cookie("token", token, {
				httpOnly: true,
				maxAge: 3 * 24 * 60 * 60 * 1000,
			})
				.status(200)
				.json({ message: "User found", userId: userFound._id });
		} else if (
			userFound &&
			!(await bcrypt.compare(password, userFound.password))
		) {
			return res
				.status(401)
				.json({ message: "Invalid usename or password" });
		} else if (!userFound) {
			return res
				.status(404)
				.json({ message: "Invalid usename or password" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error: login user" });
	}
};

const logoutUser = (req, res) => {
	res.clearCookie("token");
	res.json({ message: "token cleared" });
};

module.exports = { registerUser, loginUser, logoutUser };
