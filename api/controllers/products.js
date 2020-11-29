const Product = require("../models/product");
const mongoose = require("mongoose");
exports.products_get_all = (req, res, next) => {
  //want to return all the products we have
  //find will display all the products
  Product.find()
    .select("name price _id productImage") //to select particular keys from response
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          //map will return an array of objects
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(400).json({
          message: "No entries found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.prouducts_create_product = (req, res, next) => {
  //Product is the model(java script object which defines the schema)
  //here the product takes the value same as defined as in schema
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
  //save is a method provided by mongoose , save will store in the database
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created Product Successfully",
        createdProduct: {
          name: result.name,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.products_get_product = (req, res, next) => {
  const id = req.params.productId; //extracting productID
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products",
          },
        }); //to display on the html page
      } else {
        res.status(404).json({ message: "No valid entry found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product update",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id,
          id: id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        error: err,
      });
    });
};
exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(error);
      res.status(501).json({
        error: err,
      });
    });
};
