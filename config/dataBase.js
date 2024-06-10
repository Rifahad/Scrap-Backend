const mongoose = require('mongoose');

const Dbconnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost/scrap', {
            useNewUrlParser: true, // Only this option is necessary
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error in DB connection:', error);
    }
};

module.exports = Dbconnection;