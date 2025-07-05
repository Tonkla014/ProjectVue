const mongoose = require("mongoose");
require('dotenv').config();
const servername = process.env.SERVERNAME;

const connectDB = async () => {
    console.log('SERVERNAME:', servername);
    try {
        await mongoose.connect(servername);
        console.log("db connect");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;