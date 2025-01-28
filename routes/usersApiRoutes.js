import express from "express";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";
const router = express.Router();

// get all users
router
  .route("/")
  .get(getUsers)
  // add a user
  .post(addUser);

// get a user by id
router
  .route("/:id")
  //get a user
  .get(getUser)
  // update a user
  .put(updateUser)
  //delete a user
  .delete(deleteUser);

export default router;
