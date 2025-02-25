"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStock = exports.checkStock = exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.createProduct = exports.getProducts = void 0;
var product_1 = require("../domain/dto/product");
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var Product_1 = __importDefault(require("../infrastructure/schemas/Product"));
var getProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, data_1, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                categoryId = req.query.categoryId;
                if (!!categoryId) return [3 /*break*/, 2];
                return [4 /*yield*/, Product_1.default.find().populate('categoryId')];
            case 1:
                data_1 = _a.sent();
                res.status(200).json(data_1);
                return [2 /*return*/];
            case 2: return [4 /*yield*/, Product_1.default.find({ categoryId: categoryId }).populate('categoryId')];
            case 3:
                data = _a.sent();
                res.status(200).json(data);
                return [2 /*return*/];
            case 4:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
var createProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result = product_1.CreateProductDTO.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default("Invalid product data");
                }
                return [4 /*yield*/, Product_1.default.create(result.data)];
            case 1:
                _a.sent();
                res.status(201).send();
                return [2 /*return*/];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var getProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Product_1.default.findById(id).populate("categoryId")];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw new not_found_error_1.default("Product not found");
                }
                res.status(200).json(product).send();
                return [2 /*return*/];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProduct = getProduct;
var deleteProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Product_1.default.findByIdAndDelete(id)];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw new not_found_error_1.default("Product not found");
                }
                res.status(204).send();
                return [2 /*return*/];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var updateProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Product_1.default.findByIdAndUpdate(id, req.body)];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw new not_found_error_1.default("Product not found");
                }
                res.status(200).send(product);
                return [2 /*return*/];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateProduct = updateProduct;
var checkStock = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.params.id;
                return [4 /*yield*/, Product_1.default.findById(productId)];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw new not_found_error_1.default("Product not found");
                }
                res.status(200).json({ stock: product.stock });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkStock = checkStock;
var updateProductStock = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, stock, product, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                stock = req.body.stock;
                return [4 /*yield*/, Product_1.default.findByIdAndUpdate(id, { stock: stock }, { new: true })];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw new not_found_error_1.default("Product not found");
                }
                res.status(200).json(product);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateProductStock = updateProductStock;
//# sourceMappingURL=product.js.map