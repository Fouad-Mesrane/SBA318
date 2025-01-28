import products from "../data/products.js";
import validateRequest from "../middleware/validateRequest.js";

// get all products

export const getProducts = (req, res) => {
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
  return res.json(filteredProducts);
};

// add a product

export const addProduct =
  (validateRequest(["name", "price", "category", "stock"]),
  (req, res, next) => {
    const newProduct = {
      id: new Date().getTime(),
      ...req.body,
    };

    products.push(newProduct);
    return res.json(newProduct);
  });

// get a product by id
export const getProduct = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  return product
    ? res.json(product)
    : res.status(404).send("Product not found");
};

// update a product

export const updateProduct =
  (validateRequest(["name", "price", "category", "stock"]),
  (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (product) {
      Object.assign(product, req.body);
      return res.json(product);
    } else {
      return res.status(404).send("Product not found");
    }
  });

// delete a product
export const deleteProduct = (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("Product not found");
  }
};
