const express = require("express");
const {
	getWishes,
	addWish,
	deleteWish,
	editWish,
	takeWish,
	freeWish,
	checkWish,
	uncheckWish,
} = require("../controllers/wishController");

const wishRouter = express.Router();

wishRouter.route("/").get(getWishes).post(addWish);

wishRouter.route("/:id").put(editWish).delete(deleteWish);

wishRouter.put("/:id/take", takeWish);
wishRouter.put("/:id/free", freeWish);

wishRouter.put("/:id/check", checkWish);
wishRouter.put("/:id/uncheck", uncheckWish);

module.exports = wishRouter;
