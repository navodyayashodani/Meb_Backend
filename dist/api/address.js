"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
var express_1 = __importDefault(require("express"));
var address_1 = require("../application/address");
var authentication_middleware_1 = require("./middleware/authentication-middleware");
exports.addressRouter = express_1.default.Router();
exports.addressRouter.route("/").post(authentication_middleware_1.isAuthenticated, address_1.createAddress);
exports.addressRouter
    .route("/:id")
    .get(authentication_middleware_1.isAuthenticated, address_1.getAddress)
    .put(authentication_middleware_1.isAuthenticated, address_1.updateAddress)
    .delete(authentication_middleware_1.isAuthenticated, address_1.deleteAddress);
exports.default = exports.addressRouter;
//# sourceMappingURL=address.js.map