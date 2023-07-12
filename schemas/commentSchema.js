/*
// Title: Comment Schema
// Description: Comment schema define here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/11/2023
*/

const mongoose = require('mongoose');

// schema scaffolding
const commentSchema = mongoose.Schema({
  body : {
    type : String,
    required : true
  },
  user : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
  },
  post : {
    type : mongoose.Types.ObjectId,
    ref : 'Post'
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

module.exports = commentSchema;