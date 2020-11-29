const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }, //connecting Order Modal with Order Modal using ref (its analogous to foreign key used in SQL database)
  quantity: { type: Number, default: 1 },
});
module.exports = mongoose.model("Order", orderSchema);
