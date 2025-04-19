const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

const User = mongoose.model('User', userSchema);


module.exports = User;