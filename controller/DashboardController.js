const { pickupupload } = require("../model/pickup");
const { Company } = require("../model/companymodel");

module.exports = {
  totalUserCount: async (req, res) => {
    try {
      const totalUser = await pickupupload.countDocuments(); // Assuming users are tracked in `pickupupload`
      const userData = await pickupupload.find();
      res.json({ count: totalUser, userData });
    } catch (error) {
      console.error("Error fetching total user count:", error);
      res.status(500).json({ message: "Error fetching total user count" });
    }
  },

  totalAgentCount: async (req, res) => {
    try {
      const totalAgent = await Company.countDocuments();
      res.json({ count: totalAgent });
    } catch (error) {
      console.error("Error fetching total agent count:", error);
      res.status(500).json({ message: "Error fetching total agent count" });
    }
  },

  totalPickupCount: async (req, res) => {
    try {
      const totalPickups = await pickupupload.countDocuments(); // Counting total pickups, not users
      res.json({ count: totalPickups });
    } catch (error) {
      console.error("Error fetching total pickup count:", error);
      res.status(500).json({ message: "Error fetching total pickup count" });
    }
  },

  totalAgentPickupCount: async (req, res) => {
    try {
      const totalAgentPickups = await pickupupload.countDocuments({ agentAssigned: { $exists: true } }); // Assuming `agentAssigned` field marks pickups handled by agents
      res.json({ count: totalAgentPickups });
    } catch (error) {
      console.error("Error fetching total agent pickup count:", error);
      res.status(500).json({ message: "Error fetching total agent pickup count" });
    }
  },
};
