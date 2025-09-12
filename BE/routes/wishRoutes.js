const express = require("express");
const {
	getWishes,
	addWish,
	deleteWish,
	editWish,
	takeWish,
	freeWish,
} = require("../controllers/wishController");

const wishRouter = express.Router();

wishRouter.route("/").get(getWishes).post(addWish);

wishRouter.route("/:id").put(editWish).delete(deleteWish);

wishRouter.put("/:id/take", takeWish);
wishRouter.put("/:id/free", freeWish);

module.exports = wishRouter;
