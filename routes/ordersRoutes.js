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

// update orders
router
  .route(
    "/:id",
    validateRequest(["userId", "productId", "quantity", "status"]),
    (req, res) => {
      const order = orders.find((o) => o.id === +req.params.id);
      if (order) {
        Object.assign(order, req.body);
        res.json(order);
      } else {
        res.status(404).send("Order not found");
      }
    }
  )
  // delete order
  .delete((req, res) => {
    const index = orders.findIndex((o) => o.id === parseInt(req.params.id));
    if (index !== -1) {
      orders.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).send("Order not found");
    }
  });

export default router;
