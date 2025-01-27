import express from "express";
import validateRequest from "../middleware/validateRequest.js";
import orders from "../data/orders.js";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json(orders);
  })
  .post(
    validateRequest(["userId", "productId", "quantity", "status"]),
    (req, res) => {
      const newOrder = { id: new Date().getTime(), ...req.body };
      orders.push(newOrder);
      res.status(201).json(newOrder);
    }
  );

  

export default router;
