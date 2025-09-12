const express = require("express");
const getDashboard = require("../controllers/dashboardController");
const isAuthenticated = require("../middleware/isAuthenticated");

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", isAuthenticated, getDashboard);

module.exports = dashboardRouter;
