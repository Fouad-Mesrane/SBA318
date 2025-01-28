import validateRequest from "../middleware/validateRequest.js";
import orders from "../data/orders.js";

// get all products

export const getOrders = (req, res) => {
  return res.json(orders);
};
// add a product
export const addOrder =
  (validateRequest(["userId", "productId", "quantity", "status"]),
  (req, res) => {
    const newOrder = { id: new Date().getTime(), ...req.body };
    orders.push(newOrder);
    return res.status(201).json(newOrder);
  });
// get a product
export const getOrder = (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  return order ? res.json(order) : res.status(404).send("Order not found");
};
// update a product
export const updateOrder =
  (validateRequest(["userId", "productId", "quantity", "status"]),
  (req, res) => {
    const order = orders.find((o) => o.id === +req.params.id);
    if (order) {
      Object.assign(order, req.body);
      return res.json(order);
    } else {
      return res.status(404).send("Order not found");
    }
  });
// delete a product
export const deleteOrder = (req, res) => {
  const index = orders.findIndex((o) => o.id === parseInt(req.params.id));
  if (index !== -1) {
    orders.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("Order not found");
  }
};
