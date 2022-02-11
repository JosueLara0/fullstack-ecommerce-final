// Libraries
const express = require("express");

// Controllers
const {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  disableProduct,
  getUserProducts,
} = require("../controllers/products.controller");

// Middleware
const {
  protectSession,
  protectProductOwner,
} = require("../middlewares/auth.middleware");
const {
  createProductValidations,
  validateResult,
} = require("../middlewares/validators.middleware");

// Utils (middleware)
const { multerUpload } = require("../utils/multer");

const router = express.Router();

// Apply the middleware in every router defined below
router.use(protectSession);

// Get all products
// Create new product
router
  .route("/")
  .get(getAllProducts)
  .post(
    multerUpload.fields([{ name: "productImgs", maxCount: 2 }]), // load multiple imgs
    // multerUpload.fields([
    //   { name: "cover", maxCount: 1 },
    //   { name: "biography", maxCount: 6 },
    //   { name: "profilePic", maxCount: 1 },
    // ]), // load multiple imgs with multiple types
    // multerUpload.single("productImg"), load one img
    createProductValidations,
    validateResult,
    createProduct
  );

// Get active user products
router.get("/user-products", getUserProducts);

// Get products detail
// Update product
// Remove product
router
  .route(`/:id`)
  .get(getProductDetails)
  .patch(protectProductOwner, updateProduct)
  .delete(protectProductOwner, disableProduct);

module.exports = { productsRouter: router };
