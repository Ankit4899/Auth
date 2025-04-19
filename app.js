const express = require("express");
const connectDB = require('./db')
var passport = require('passport');
var LocalStrategy = require('passport-local');
const bcrypt = require("bcrypt");
var cors = require('cors')
const User = require('./models/users')
require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
connectDB();


app.get('/',(req,res)=>{
  console.log("connected")
  res.send("connected")
})


app.post('/users',async (req,res)=>{
 try{
  const user =new User(req.body);
  const newUser =await user.save();
  res.status(201).json(newUser);
 }
 catch(e){
  console.log(e);
  res.status(500).json({ error: 'Failed to create user' });
 }
})


passport.use(new LocalStrategy(
  async function(name, password, done) {
    try {
      const user = await User.findOne({ name });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Compare the plain text password directly
      const isMatch = password === user.password;

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


app.use(passport.initialize());

const auth = passport.authenticate('local', { session: false });

app.get('/users',auth,async (req,res)=>{
  try{
    const user = await User.find({});
  // res.send(user)
  res.status(200).json({ user });
  }catch(e){
    res.status(500).json({error:e})
  }
})


app.listen(port, (req, res) => {
  console.log(`port is listening to port no. ${port}`);
});
