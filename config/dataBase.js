const mongoose = require('mongoose');
require("dotenv").config()

// const url = process.env.ATLAS_URL
const url = 'mongodb://localhost:27017/tkmscrap';

const Dbconnection = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true, // Only this option is necessary
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error in DB connection:', error);
    }
};

module.exports = Dbconnection;