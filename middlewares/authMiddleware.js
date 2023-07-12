/*
// Title: Auth middleware
// Description: Check auth user.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/5/2023
*/

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1].replace(/['"]/g, '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    
    // return with user in req
    mongoose.model('User').findById(userId, 'first_name last_name username created_at').then(data => {
      req.id = userId;
      req.user = data;
      return next();
    }).catch(err => {
      return next({
        status : false,
        message : 'Something went wrong! try again later.',
        data : null,
        errors : {}
      });
    });
  } catch (err) {
    return res.status(401).json({
      status : false,
      message : 'Unathorized',
      data : null,
      errors : {}
    });
  }
}

module.exports = authMiddleware;