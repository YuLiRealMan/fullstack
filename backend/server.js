//const express = require('express');
import express from 'express'; // need to go to package.json and add "type": "module" to the json file

import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

// console.log(process.env.MONGO_URI); // this will print the mongo_uri to the console

const app = express();
app.use(express.json());    // this will allow us to parse the incoming json data

app.use("/api/products",productRoutes);

app.listen(5000, () => {
    connectDB();
  console.log('server started at http://localhost:5000');
});

//qYHRgxPoT4lYaqei