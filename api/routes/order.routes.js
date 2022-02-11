// Libraries
const express = require("express");

// Controllers
const {
  addProductToCart,
  getUserCart,
  updateProductCart,
  purchaseOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/orders.controller");

// Middleware
const {
  updateProductCartValidations,
  validateResult,
} = require("../middlewares/validators.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protectSession);

// ! Homework 28-01-22
// Get user's order
router.get("/get-orders", getUserOrders);

// Get user's cart
router.get("/get-cart", getUserCart);

// Add product to cart
router.post("/add-product-to-cart", addProductToCart);

// Update cart product quantity
router.patch(
  "/update-cart-product",
  updateProductCartValidations,
  validateResult,
  updateProductCart
);

// Remove product from cart

// ! Homework 26-01-22
// Create order
router.post("/purchase-order", purchaseOrder);

// Get order by id
router.get("/:id", getOrderById);

module.exports = { ordersRouter: router };
