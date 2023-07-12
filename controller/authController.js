/*
// Title: todoController
// Description: Todo controller to controll route functions. 
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/5/2023
*/

// dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');
const User = mongoose.model('User', userSchema);

// scaffolding
const authController = {};

// singup controller
authController.signup = async (req, res) => {
  try {
    const uniqueUsername = await User.findOne({ username : req.body.username });
    if(uniqueUsername) {
      return res.status(200).json({
        status : false,
        message : 'Username already taken.',
        data : null,
        errors : {}
      });
    }

    // hash password
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    
    // store user data to db
    const newUser = new User({
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      username : req.body.username,
      password : hashedPass
    });

    await newUser.save();
    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : newUser.getSpecificField(),
      errors : {}
    });
  } catch (err) {
    return res.status(500).json({
      status : false,
      message : 'Something went wrong! try again later.',
      data : null,
      errors : err.errors
    });
  }
}

// signin controller
authController.singin = async (req, res) => {
  try {
    const user = await User.findOne({ username : req.body.username });
    if(!user) {
      return res.status(401).json({
        status : false,
        message : 'User not found!',
        data : null,
        errors : {}
      });
    }

    // check hashed password
    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if(user && isValidPass) {
      // create token
      const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET, { expiresIn : '1d' });
      res.status(200).json({
        status : true,
        message : 'Successful!',
        data : { user: user.getSpecificField(), token },
        errors : {}
      });
    } else {
      return res.status(401).json({
        status : false,
        message : 'User not found!',
        data : null,
        errors : {}
      })
    }
  } catch (err) {
    res.status(500).json({
      status : false,
      message : 'Something went wrong! try again later.',
      data : null,
      errors : {}
    })
  }
}

module.exports = authController;