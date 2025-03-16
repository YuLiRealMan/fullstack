//const express = require('express');
import express from 'express'; // need to go to package.json and add "type": "module" to the json file

import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

// console.log(process.env.MONGO_URI); // this will print the mongo_uri to the console

const app = express();
app.use(express.json());    // this will allow us to parse the incoming json data

app.post('/api/products', async (req, res) => {
  console.log(req.body);
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({  success:false, message: 'All fields are required' });
  }


  const newProduct = new Product(product)
  try {
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.log("Error in saving product to the database: ", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/products', (req, res) => {
  res.send('Server is ready');
});

app.listen(5000, () => {
    connectDB();
  console.log('server started at http://localhost:5000');
});

//qYHRgxPoT4lYaqei