//const express = require('express');
import express from 'express'; // need to go to package.json and add "type": "module" to the json file

import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import { mongo } from 'mongoose';

// console.log(process.env.MONGO_URI); // this will print the mongo_uri to the console

const app = express();
app.use(express.json());    // this will allow us to parse the incoming json data

app.post('/api/products', async (req, res) => {
 
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

app.delete('/api/products/:id', async (req, res) => {
  const {id} = req.params.id; //  get the id from the request params
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });       
    } catch (error) {  
    console.log("Error in deleting product from the database: ", error);
    res.status(404).json({ success: false, message: 'Product not found' });
    }  
});


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.log("Error in fetching products from the database: ", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const {id} = req.params; //  get the id from the request params
  try {
    const product = await Product.findById(id); // find the product by id
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }           
    res.status(200).json({ success: true, product: product });
  } catch (error) { 
    console.log("Error in fetching product from the database: ", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.put('/api/products/:id', async (req, res) => { 
  const {id} = req.params; //  get the id from the request params
  const product = req.body; // get the product data from the request body

  if(!mongo.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product ID' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // find the product by id and update it      
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) { 
    console.log("Error in updating product from the database: ", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
} );


app.listen(5000, () => {
    connectDB();
  console.log('server started at http://localhost:5000');
});

//qYHRgxPoT4lYaqei