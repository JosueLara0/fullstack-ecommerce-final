// Libraries
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// Routers
const { userRouter } = require("./routes/users.routes");
const { productsRouter } = require("./routes/product.routes");
const { ordersRouter } = require("./routes/order.routes");
const { viewsRouter } = require("./routes/views.routes");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

// Utils
const { AppError } = require("./utils/appError");

// Init app
const app = express();

app.use(xss());
app.use(helmet());
app.use(compression());

app.use(
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: "Too many requests from this IPs",
  })
);

app.use(express.static(path.join(__dirname, "client", "public")));
app.set("view-engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("*", cors());

app.use(cookieParser());

// Console.log of methods of postman
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else app.use(morgan("combined"));

// Endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/", viewsRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = { app };
