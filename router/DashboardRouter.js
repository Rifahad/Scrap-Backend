const express = require("express");
const Router = express.Router();
const {
  totalUserCount,
  totalAgentCount,
  totalPickupCount,
  totalAgentPickupCount,
} = require("../controller/DashboardController");

Router.get("/dashboard/totalAgentCount", totalAgentCount);
Router.get("/dashboard/totalPickupCount", totalPickupCount);
Router.get("/dashboard/totalUserCount", totalUserCount);
Router.get("/dashboard/totalAgentPickupCount", totalAgentPickupCount);

module.exports =   Router

  