// routes/cardRoutes.js (or the appropriate file name)
const express = require("express");
const Router = express.Router();
const  ProductController = require("../controller/cardController");

const userController = require("../controller/userController");
const authController = require("../controller/authController");

//multer section starts here
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


// saving card details in database
Router.post("/AdminLogin", authController.Login);
Router.post("/card", upload.single("file"), ProductController.cardPost);

// user data sending to frondend
Router.get("/Users", userController.user);

// admin user delete path
Router.post("/admin/User/delete", userController.userdelete);

// admin product card delete path
Router.post("/productdelete", ProductController.adminproductdelete);

// admin product card edit path
Router.get("/products/:id", ProductController.adminproductedit);
Router.put("/products/:id", upload.single("image"), ProductController.updateProduct);

// admin product card path  for passing data to front end
Router.get("/adminProduct", ProductController.adminCard);

module.exports = Router;
