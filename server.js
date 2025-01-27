import express from "express";
import bodyParser from "body-parser";
import path from "path";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;

//middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//api routes

import userApiRoutes from "./routes/usersApiRoutes.js";
import productsApiRoutes from "./routes/productsApiRoutes.js";
import ordersApiRoutes from "./routes/ordersApiRoutes.js";

app.use("/api/users", userApiRoutes);
app.use("/api/products", productsApiRoutes);
app.use("/api/orders", ordersApiRoutes);

// pages routes

import usersPage from "./routes/usersPage.js"
app.use("/users", usersPage)

// Home Route
app.get("/", (req, res) => {
  res.render("home"); // Render the homepage
});

// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running at PORT :`, PORT);
});
