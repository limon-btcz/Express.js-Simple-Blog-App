/*
// Title: Post routes
// Description: Post routes define here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/3/2023
*/

const express = require('express');
const router = express.Router();

// dependencies
const postController = require('../../controller/postController');
const commentController = require('../../controller/commentController');
const authMiddleware = require('../../middlewares/authMiddleware');

// index - get all todo
router.get('/', authMiddleware, postController.index);

// show - show specific todo
router.get('/:id', authMiddleware, postController.show);

// store - store todo to db
router.post('/', authMiddleware, postController.store);

// edit - send specific todo data
router.get('/edit/:id', authMiddleware, postController.edit);

// update - update specific todo
router.put('/:id', authMiddleware, postController.update);

// delete - delete specific todo
router.delete('/:id', authMiddleware, postController.delete);

// add comment to post
router.post('/:id/comment', authMiddleware, commentController.store);

// update comment
router.put('/:id/comment/:comment_id', authMiddleware, commentController.update);

// delete comment
router.delete('/:id/comment/:comment_id', authMiddleware, commentController.delete);

module.exports = router;