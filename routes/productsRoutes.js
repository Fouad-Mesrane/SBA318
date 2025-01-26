import express from "express";
import products from "../data/products.js";
import validateRequest from "../middleware/validateRequest.js";
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
    res.json(filteredProducts);
  })
  .post(
    validateRequest(["name", "price", "category", "stock"]),
    (req, res, next) => {
      const newProduct = {
        id: new Date().getTime(),
        ...req.body,
      };

      products.push(newProduct);
      res.json(newProduct);
    }
  );

// get product by id
router.route("/:id").get((req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).send("Product not found");
});

export default router;
