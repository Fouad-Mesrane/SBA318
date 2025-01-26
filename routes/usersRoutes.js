import express from "express";
import users from "../data/users.js";
const router = express.Router()



// get all users
router.route("/")
.get((req,res) => {
    res.json(users)
})
// add a user
.post((req,res, next) => {
    const {name, email, role} = req.body
    if (name && email && role) {
    const user = users.find(user => user.email === req.body.email)
        if (user) res.send ("User Already registered with this email")
        const newUser = {
            id : users.length + 1,
            ...req.body
        }
        users.push(newUser)
        res.status(201).json(newUser)
    } else {
        res.json( {error : "user not added, please fill all the required fields"})
        next()
    }
      
})


// get a user by id 
router.route("/:id")
.get((req,res) => {
    const user = users.find(user => user.id === +req.params.id)
    user ? res.json(user) : res.status(404).send("User Not Found")
})



export default router