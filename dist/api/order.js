"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = __importDefault(require("express"));
var order_1 = require("../application/order");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get("/my-orders", order_1.getMyOrders);
exports.orderRouter.post("/", order_1.createOrder);
exports.orderRouter.get("/:id", order_1.getOrder);
//# sourceMappingURL=order.js.map