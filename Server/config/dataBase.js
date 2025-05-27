const mongoose = require('mongoose');

require('dotenv').config();

exports.connectDb = async () => {
   await mongoose.connect(process.env.MONGO_URL).then( () => {
    console.log("Database connected successfully");
   }).catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); 
   });
}