const express = require("express");
const router = express.Router();

const multer = require("multer"); //multer is like a body parser which parses form data where we can upload files and all
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");
const storage = multer.diskStorage({
  destination: function (req, fil, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  //accept a file
  if (file.mimetype === "image/jpeg" || "image/png") {
    cb(null, true);
  } else {
    cb(null, false); //reject a file
  }
};
//initializing multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
//once the request is passed to /products and the handler function points here "/" as "/products" will lead to "/products/products" page which we dont need

router.get("/", ProductsController.products_get_all);
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductsController.prouducts_create_product
);
router.get("/:productId", ProductsController.products_get_product);
router.patch(
  "/:productId",
  checkAuth,
  ProductsController.products_update_product
);
router.delete(
  "/:productId",
  checkAuth,
  ProductsController.products_delete_product
);
module.exports = router;
