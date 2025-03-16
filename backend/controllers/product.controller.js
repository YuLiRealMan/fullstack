import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, products: products });
    } catch (error) {
      console.log("Error in fetching products from the database: ", error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

export const createProduct = async (req, res) => {
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
  };

export const updateProduct = async (req, res) => { 
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
  };

export const deleteProduct = async (req, res) => {
    const {id} = req.params; //  get the id from the request params
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: 'Invalid Product ID' });
    }
  
    try {

      await Product.findByIdAndDelete(id);
    
      res.status(200).json({ success: true, message: 'Product deleted successfully' });       
      } catch (error) {  
      console.log("Error in deleting product from the database: ", error);
      res.status(500).json({ success: false, message: 'Server Error' });
      }  
  };