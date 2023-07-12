/*
// Title: Post Controller
// Description: Post controller to controll route functions. 
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/3/2023
*/

// dependencies
const mongoose = require('mongoose');
const postSchema = require('../schemas/postSchema');
const Post = mongoose.model('Post', postSchema);

// scaffolding
const postController = {};

// index - response all post data
postController.index = async (req, res) => {
  try {
    const post_list = await Post.find({}).populate('user', 'first_name last_name username')
                                .populate({ path : 'comments', model : 'Comment', select : 'body created_at updated_at', populate : { path : 'user', model : 'User', select : 'username first_name last_name' } })
                                .select({ __v : 0 });
  
    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : post_list,
      errors : {}
    })
  } catch (err) {
    return res.status(500).json({
      status : false,
      message : 'Something went wrong! try again later.',
      data : null,
      errors : {}
    });
  }
}

// show - response specific post data
postController.show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'first_name last_name username')
                           .populate({ path : 'comments', model : 'Comment', select : 'body created_at updated_at', populate : { path : 'user', model : 'User', select : 'username first_name last_name' } })
                           .select({ __v : 0 });

    if(!post) {
      return res.status(404).json({
        status : false,
        message : 'No data found!',
        data : null,
        errors : {}
      });
    }

    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : post,
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
}

// store - store to database and response
postController.store = async (req, res) => {
  const { title, description } = req.body;
  if(!title || !description) {
    return res.json({
      status : false,
      message : 'Please fill the required field!',
      data : null,
      errors : {}
    });
  }

  const newPost = new Post({ title, description, user : req.id});
  try {
    await newPost.save();
    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : newPost.getSpecificField(),
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

// edit - response specific post data to edit
postController.edit = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select({ __v : 0 });

    // response 404 if post not found or req user not owner of post
    if(!post || post.user.toString() !== req.id) {
      return res.status(404).json({
        status : false,
        message : 'No data found!',
        data : null,
        errors : {}
      });
    }

    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : post,
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
}

// update - update post data and response
postController.update = async (req, res) => {
  const { title, description } = req.body;
  if(!title || !description) {
    return res.json({
      status : false,
      message : 'Please fill the required field!',
      data : null,
      errors : {}
    });
  }

  try {
    const post = await Post.findOneAndUpdate({ _id : req.params.id, user : req.id }, {
      $set : {
        title,
        description,
        updated_at : Date.now()
      }
    }, {new: true}).select({ __v : 0 });

    // response 404 if post not found or req user not owner of post
    if(!post || post.user.toString() !== req.id) {
      return res.status(404).json({
        status : false,
        message : 'No data found!',
        data : null,
        errors : {}
      });
    }

    return res.status(200).json({
      status : true,
      message : 'Successful!',
      data : post.getSpecificField(),
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
}

// delete - delete specific post and response
postController.delete = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id : req.params.id, user : req.id });

    // response 404 if post not found or req user not owner of post
    if(!post || post.user.toString() !== req.id) {
      return res.status(404).json({
        status : false,
        message : 'No data found!',
        data : null,
        errors : {}
      });
    }

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
}

module.exports = postController;