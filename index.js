/*
// Title: Simple Blog App
// Description: Simple Blog app api with express.js
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/3/2023
*/

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// dependencies
const authRoutes = require('./routes/api/authRoutes');
const postRoutes = require('./routes/api/postRoutes');

// app initialization
const app = express();
dotenv.config();
app.use(express.json());

// database connections
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('connection successful!'))
.catch(error => console.log(error));

// app routes
app.get('/', (req, res) => {
  res.send('Home page');
});
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// 404 route handler
app.use((req, res, next) => {
  res.status(404).json({
    status : false,
    message : 'Page not found!',
    data : null,
    errors : {}
  });
});

// error handler
app.use((err, req, res, next) => {
  if(res.headerSent) {
    next('There was an problem to handle request!');
  } else {
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(500).json({
        status : false,
        message : 'Something went wrong! try again later.',
        data : null,
        errros : {}
      });
    }
  }
});

// create server
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});