require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3002;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const wishRouter = require("./routes/wishRoutes");
const connectToDB = require("./mongodb/config/dbconnect");
const isAuthenticated = require("./middleware/isAuthenticated");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use("/auth", authRouter);
app.use("/wishes", isAuthenticated, wishRouter);
app.use("/", dashboardRouter);

connectToDB();

app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
