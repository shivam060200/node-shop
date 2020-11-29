const mongoose = require("mongoose");
const product_schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, require: true },
});
module.exports = mongoose.model("Product", product_schema);
//so this will define how product will look like in my application
//mongoose helps to define schemas or models for my application
//So every product should have an _id, name and price
//SO while using the model in other js file it will refer the model as "Product"
