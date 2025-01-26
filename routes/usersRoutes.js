import express from "express";
import users from "../data/users.js";
const router = express.Router()


router.route("/")
.get((req,res) => {
    res.json(users)
})



export default router