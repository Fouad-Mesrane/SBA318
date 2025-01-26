import express from "express";
import products from "../data/products.js";
const router = express.Router();

router
  .route("/")
  // getting products data with optional queries to filter

  .get((req, res) => {
    let filteredProducts = products;

    // filter by category

    if (req.query.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === req.query.category
      );
    }
    if (req.query.minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseFloat(req.query.minPrice)
      );
    }
    if (req.query.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= parseFloat(req.query.maxPrice)
      );
    }
    res.json(filteredProducts)
  });

export default router;
