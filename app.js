//app.js for handling requests more user
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let port = process.env.PORT || 3000;

const productRoutes = require("./api/routes/products"); // this will fetch the product/js content
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
mongoose.connect(
  "mongodb+srv://shivam:" +
    process.env.MONGO_ATLAS_PW +
    "@clustershop.sibpm.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    //useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.Promise = global.Promise;
//so whenever any http request is passed to /products the handler function (productRoutes) accepts the http request of URL /products
app.use(morgan("dev")); //Concise output colored by response status for development use. The :status token will be colored green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//preventing CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Allow-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
//Routes which should handle requests
app.use("/products", productRoutes); //middleware - that means every incoming request has to pass thorugh app.use
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
//next is a function which you can execute the request to next middleware in the line
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
}); //no incoming request was handled by the above two middleware and their respective routes in the routes folder ...so it means no route was found...so its an error..so we are handling error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
module.exports = app;
