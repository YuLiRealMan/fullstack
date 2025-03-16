import express from "express";

import { deleteProduct,createProduct ,getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);


// router.get('/:id', async (req, res) => {
//     const {id} = req.params; //  get the id from the request params
//     try {
//       const product = await Product.findById(id); // find the product by id
//       if (!product) {
//         return res.status(404).json({ success: false, message: 'Product not found' });
//       }           
//       res.status(200).json({ success: true, product: product });
//     } catch (error) { 
//       console.log("Error in fetching product from the database: ", error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   });
  
export default router;