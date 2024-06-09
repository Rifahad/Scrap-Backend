const express = require('express')
const router = express.Router()
const {pickPost}=require('../controller/pickupController')
const pickupstorage =require('../middleware/multer')
const multer = require('multer')
const upload =multer({pickupstorage})

// pickup data saving to database 
router.post('/pickup', upload.single('kilogram'),pickPost)



module.exports =router

