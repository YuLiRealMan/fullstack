import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
const router = express.Router();


router.post('/', async (req, res) => {
 
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

router.delete('/:id', async (req, res) => {
  const {id} = req.params; //  get the id from the request params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product ID' });
  }

  try {
    console.log(id);
    await Product.findByIdAndDelete(id);
  
    res.status(200).json({ success: true, message: 'Product deleted successfully' });       
    } catch (error) {  
    console.log("Error in deleting product from the database: ", error);
    res.status(404).json({ success: false, message: 'Product not found' });
    }  
});


router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.log("Error in fetching products from the database: ", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => { 
  const {id} = req.params; //  get the id from the request params
  const product = req.body; // get the product data from the request body

  if(!mongoose.Types.ObjectId.isValid(id)) {
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

export default router;