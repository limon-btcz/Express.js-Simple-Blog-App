/*
// Title: Post Schema
// Description: Post schema define here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/3/2023
*/

const mongoose = require('mongoose');

// schema scaffolding
const postSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  comments : [
    {
      type : mongoose.Types.ObjectId,
      ref : 'Comment',
    }
  ],
  user : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
  },
  created_at : {
    type : Date,
    default : Date.now
  },
  updated_at : {
    type : Date,
    default : null
  }
});

// return specific field on save or update
postSchema.methods.getSpecificField = function() {
  return {
    _id : this._id,
    title : this.title,
    description : this.description,
    created_at : this.created_at,
    updated_at : this.updated_at
  }
}

module.exports = postSchema;