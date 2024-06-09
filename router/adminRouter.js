// routes/cardRoutes.js (or the appropriate file name)
const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { storage } = require('../middleware/multer'); // Ensure correct import
const { cardPost, carddetailspost,adminCard } = require('../controller/cardController');
const {user,userdelete}=require('../controller/userController')

const upload = multer({ storage });
// saving card details in database 
Router.post('/card', upload.single("file"), cardPost);
// card details sending to backend to frondend 
Router.post('/products', carddetailspost);

// user data sending to frondend 
Router.get('/Users',user)

// admin user delete path 
Router.post('/admin/User/delete',userdelete)


// admin product card path 
Router.get('/Products',adminCard)

module.exports = Router;
