import express from "express";
import validateRequest from "../middleware/validateRequest.js";
import users from "../data/users.js";
const router = express.Router();

// get all users
router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  // add a user
  .post(validateRequest(["name", "email", "role"]), (req, res) => {
    const user = users.find((user) => user.email === req.body.email);
    if (user) res.send("User Already registered with this email");
    const newUser = {
      id: new Date().getTime(),
      ...req.body,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  });

// get a user by id
router
  .route("/:id")
  .get((req, res) => {
    const user = users.find((user) => user.id === +req.params.id);
    user ? res.json(user) : res.status(404).send("User Not Found");
  })
  .put(validateRequest(["name", "email", "role"]), (req, res, next) => {
    const user = users.find((user) => user.id === +req.params.id);
    if (user) {
      Object.assign(user, req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
      next();
    }
  })
  .delete((req, res) => {
    const index = users.findIndex((user) => user.id === +req.params.id);
    if (index !== -1) {
      users.splice(index, 1);
      res.json({ message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });

export default router;
