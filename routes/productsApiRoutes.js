import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router();

router
  .route("/")
  // getting products data with optional queries to filter
  .get(getProducts)
  .post(addProduct);

router
  .route("/:id")
  //get product by id
  .get(getProduct)
  // update a product
  .put(updateProduct)
  //delete a product
  .delete(deleteProduct);

export default router;
