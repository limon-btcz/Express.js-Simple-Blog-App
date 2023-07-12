/*
// Title: Todo Schema
// Description: Todo schema define here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/5/2023
*/

const mongoose = require('mongoose');

// schema scaffolding
const userSchema = mongoose.Schema({
  first_name : {
    type : String,
    required : true
  },
  last_name : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  post : [
    {
      type : mongoose.Types.ObjectId,
      ref : 'Post'
    }
  ],
  created_at : {
    type : Date,
    default : Date.now
  },
  updated_at : {
    type : Date,
    default : null
  }
});

// return specific user data
userSchema.methods.getSpecificField = function () {
  return {
    _id : this._id,
    first_name : this.first_name,
    last_name : this.last_name,
    username : this.username,
    created_at : this.created_at,
    updated_at : this.updated_at
  }
}

module.exports = userSchema;