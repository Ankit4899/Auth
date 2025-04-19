const mongoose = require('mongoose');
require('dotenv').config();
const mongourl = process.env.MONGO_URL;
async function connectDB() {
 try{
  await mongoose.connect(mongourl);
  console.log("database connected");
 }catch(err){
  console.log(err);
 }

}

module.exports = connectDB;