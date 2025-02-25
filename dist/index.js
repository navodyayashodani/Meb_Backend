"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var product_1 = require("./api/product");
var db_1 = require("./infrastructure/db");
var global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
var category_1 = require("./api/category");
var cors_1 = __importDefault(require("cors"));
var order_1 = require("./api/order");
var payment_1 = require("./api/payment");
// import { clerkMiddleware } from "@clerk/express";
var app = (0, express_1.default)();
// Middleware order is important
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Routes
app.use("/api/products", product_1.productRouter);
app.use("/api/categories", category_1.categoryRouter);
app.use("/api/orders", order_1.orderRouter);
app.use("/api/payments", payment_1.paymentRouter);
app.use(global_error_handling_middleware_1.default);
(0, db_1.connectDB)();
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
//# sourceMappingURL=index.js.map