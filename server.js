import express from "express";
import bodyParser from "body-parser";
import path from "path"
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";


const app = express();
const PORT = 3000;



//middlewares
app.use(bodyParser.json())
app.use(logger)
app.use(express.static("public"));
app.set("view engine", "ejs")

// routes

import userRoutes from "./routes/usersRoutes.js"
import productsRoutes from "./routes/productsRoutes.js"
import ordersRoutes from "./routes/ordersRoutes.js"

app.use('/api/users', userRoutes);
app.use('/api/products',productsRoutes );
app.use("/api/orders", ordersRoutes)





// error handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server Running at PORT :`, PORT)
})



