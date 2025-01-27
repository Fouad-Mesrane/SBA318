import express from "express";
import users from "../data/users.js";
const router = express.Router();

router.route("/").get((req, res) => {
  res.render("users", { users });
});

export default router;
