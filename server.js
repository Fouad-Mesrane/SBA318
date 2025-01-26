import express from "express";
import bodyParser from "body-parser";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";


const app = express();
const PORT = 3000;




app.use(bodyParser.json())
// logger middleware to log requests
app.use(logger)








// error handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server Running at PORT :`, PORT)
})



