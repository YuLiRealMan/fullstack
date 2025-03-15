//const express = require('express');
import express from 'express'; // need to go to package.json and add "type": "module" to the json file

import { connectDB } from './config/db.js';

// console.log(process.env.MONGO_URI); // this will print the mongo_uri to the console

const app = express();
app.get('/products', (req, res) => {
  res.send('Server is ready');
});



app.listen(5000, () => {
    connectDB();
  console.log('server started at http://localhost:5000');
});

//qYHRgxPoT4lYaqei