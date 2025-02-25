"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = __importDefault(require("express"));
var authentication_middleware_1 = require("./middleware/authentication-middleware");
var authorization_middleware_1 = require("./middleware/authorization-middleware");
var product_1 = require("../application/product");
exports.productRouter = express_1.default.Router();
// Public routes
exports.productRouter.get("/", product_1.getProducts);
exports.productRouter.get("/:id", product_1.getProduct);
// Protected admin routes
exports.productRouter.post("/", authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.createProduct);
exports.productRouter.patch("/:id", authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.updateProduct);
exports.productRouter.delete("/:id", authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.deleteProduct);
// Stock routes
exports.productRouter.get("/:id/stock", product_1.checkStock);
exports.productRouter.patch("/:id/stock", product_1.updateProductStock);
//# sourceMappingURL=product.js.map