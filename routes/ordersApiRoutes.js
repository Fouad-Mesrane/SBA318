import express from "express";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.js";

const router = express.Router();

router
  .route("/")
  // getb all orders
  .get(getOrders)
  //add an order
  .post(addOrder);

// update orders
router
  .route("/:id")
  // get an order
  .get(getOrder)
  // update order
  .put(updateOrder)
  // delete order
  .delete(deleteOrder);

export default router;
