import users from "../data/users.js";
import validateRequest from "../middleware/validateRequest.js";
// get all users
export const getUsers = (req, res) => {
  return res.json(users);
};

// add a new user

export const addUser =
  (validateRequest(["name", "email", "role"]),
  (req, res) => {
    const user = users.find((user) => user.email === req.body.email);
    if (user) res.send("User Already registered with this email");
    const newUser = {
      id: new Date().getTime(),
      ...req.body,
    };
    users.push(newUser);
    return res.status(201).redirect("/users");
  });
// get a user

export const getUser = (req, res) => {
  const user = users.find((user) => user.id === +req.params.id);
  return user ? res.json(user) : res.status(404).send("User Not Found");
};

// update a user

export const updateUser =
  (validateRequest(["name", "email", "role"]),
  (req, res) => {
    const user = users.find((user) => user.id === +req.params.id);
    if (user) {
      Object.assign(user, req.body);
      res.json(user);
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  });

// delete a user

export const deleteUser = (req, res) => {
  const index = users.findIndex((user) => user.id === +req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    return res.json({ message: "User Deleted Successfully" });
  } else {
    return res.status(404).json({ message: "user not found" });
  }
};
