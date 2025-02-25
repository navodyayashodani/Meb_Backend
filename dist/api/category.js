"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
var express_1 = __importDefault(require("express"));
var category_1 = require("../application/category");
exports.categoryRouter = express_1.default.Router();
exports.categoryRouter
    .route("/")
    .get(category_1.getCategories)
    .post(category_1.createCategory); // Removed middleware
exports.categoryRouter
    .route("/:id")
    .get(category_1.getCategory)
    .delete(category_1.deleteCategory) // Removed middleware
    .patch(category_1.updateCategory); // Removed middleware
//# sourceMappingURL=category.js.map