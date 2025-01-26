import express from "express";
import bodyParser from "body-parser";
import path from "path"
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";


const app = express();
const PORT = 3000;



//middlewares
app.use(bodyParser.json())
app.use(logger)
app.use(express.static("public"));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'views'))
// routes






// error handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server Running at PORT :`, PORT)
})



