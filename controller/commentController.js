/*
// Title: Comment Controller
// Description: Comment controller.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/11/23
*/

// dependencies
const mongoose = require('mongoose');
const commentSchema = require('../schemas/commentSchema');
const Comment = mongoose.model('Comment', commentSchema);
const Post = mongoose.model('Post');

// scaffolding
const commentController = {};

// store comment to database
commentController.store = async (req, res) => {
  const { body } = req.body;
  if(!body) {
    return res.json({
      status : false,
      message : 'Please fill the required field!',
      data : null,
      errors : {}
    });
  }

  try {
    const post = await Post.findById(req.params.id);
    const newComment = new Comment({ body, user : req.id });

    // response if post not found
    if(!post) {
      return res.status(404).json({
        status : false,
        message : 'No data found!',
        data : null,
        errors : {}
      });
    };

    await newComment.save();
    await post.updateOne({ $push : { comments : newComment._id }});

    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : newComment,
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
};

// update specific comment in database
commentController.update = async (req, res) => {
  const { body } = req.body;
  if(!body) {
    return res.json({
      status : false,
      message : 'Please fill the required field!',
      data : null,
      errors : {}
    });
  }

  try {
    const comment = await Comment.findOneAndUpdate({ _id : req.params.comment_id, user : req.id }, {
      $set : {
        body,
        updated_at : Date.now()
      }
    }, {new: true}).populate({ path : 'user', model : 'User', select : 'username first_name last_name' }).select({ __v : 0 });

    // response 404 if comment not found or req user not owner of comment
    if(!comment || comment.user._id.toString() !== req.id) {
      return res.status(404).json({
        status : false,
        message : 'No data found!',
        data : null,
        errors : {}
      });
    };

    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : comment,
      errors : {}
    });
  } catch (err) {
    return res.status(500).json({
      status : false,
      message : 'Something went wrong! try again later.',
      data : null,
      errors : {}
    });
  }
};

// delete specific comment
commentController.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select({ user : 1 });
    const comment = await Comment.findOneAndDelete({ _id : req.params.comment_id, user : req.id });

    // response 404 if comment not found or req user not owner of comment
    if(!comment || comment.user.toString() !== req.id || post.user.toString() !== req.id) {
      return res.status(404).json({
        status : false,
        message : 'No data found!',
        data : null,
        errors : {}
      });
    }

    await post.updateOne({ $pull : { comments : req.params.comment_id }});
    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : null,
      errors : {}
    });
  } catch (err) {
    return res.status(500).json({
      status : false,
      message : 'Something went wrong! try again later.',
      data : null,
      errors : {}
    });
  }
};

module.exports = commentController;