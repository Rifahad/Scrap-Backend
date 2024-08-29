const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 7000;
const path = require("path");
const cors = require("cors");
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRouter");
const agentRouter = require("./router/CompanyRouter");
const DashboardRouter = require("./router/DashboardRouter");
const Dbconnection = require("./config/dataBase");
const corsOptions = {
  origin: '*' || "http://localhost:5173", // Update this with your actual frontend URL in production
  maxAge: 86400, // 1 day
};
app.use(cors(corsOptions));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));


// Use routers
app.use("/", adminRouter);
app.use("/", userRouter);
app.use("/", DashboardRouter);
app.use("/", agentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// Database connection and server start
Dbconnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
