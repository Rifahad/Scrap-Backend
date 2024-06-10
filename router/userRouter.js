const express = require('express')
const router = express.Router()
const {pickPost}=require('../controller/pickupController')
const {adminCard}=require('../controller/cardController')
const { carddetailspost, } = require('../controller/cardController');

const pickupstorage =require('../middleware/multer')
const multer = require('multer')
const upload =multer({pickupstorage})

// pickup data saving to database 
router.post('/pickup', upload.single('kilogram'),pickPost)

// this path for sending data backend to frondend for product looping
router.post('/products', carddetailspost);

module.exports =router

