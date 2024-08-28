const express = require('express')
const router = express.Router()
const {pickPost}=require('../controller/pickupController')
const { carddetailspost, } = require('../controller/cardController');


const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// pickup data saving to database 
router.post('/pickup', upload.single('pickupImage'), pickPost);

// this path for sending data backend to frondend for product looping
router.post('/products', carddetailspost);

module.exports =router

