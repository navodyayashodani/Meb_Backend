"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getMyOrders = exports.getOrder = exports.createOrder = void 0;
var zod_1 = require("zod");
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var Order_1 = __importDefault(require("../infrastructure/schemas/Order"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var Address_1 = __importDefault(require("../infrastructure/schemas/Address"));
var Product_1 = __importDefault(require("../infrastructure/schemas/Product"));
var mongoose_1 = __importDefault(require("mongoose"));
var orderSchema = zod_1.z.object({
    items: zod_1.z
        .object({
        product: zod_1.z.object({
            _id: zod_1.z.string(),
            name: zod_1.z.string(),
            price: zod_1.z.string(),
            image: zod_1.z.string(),
            description: zod_1.z.string().optional(),
        }),
        quantity: zod_1.z.number(),
    })
        .array(),
    shippingAddress: zod_1.z.object({
        line_1: zod_1.z.string(),
        line_2: zod_1.z.string(),
        city: zod_1.z.string(),
        state: zod_1.z.string(),
        zip_code: zod_1.z.string(),
        phone: zod_1.z.string(),
    }),
});
var createOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var session, userId, result, _i, _a, item, product, address, order, _b, _c, item, populatedOrder, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
            case 1:
                session = _d.sent();
                session.startTransaction();
                _d.label = 2;
            case 2:
                _d.trys.push([2, 15, 17, 18]);
                userId = "user_2sk2GwRWkOZcJ4gazgpLrRnKn56";
                result = orderSchema.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default("Invalid order data");
                }
                _i = 0, _a = result.data.items;
                _d.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                item = _a[_i];
                return [4 /*yield*/, Product_1.default.findById(item.product._id).session(session)];
            case 4:
                product = _d.sent();
                if (!product) {
                    throw new validation_error_1.default("Product ".concat(item.product._id, " not found"));
                }
                if (product.stock < item.quantity) {
                    throw new validation_error_1.default("Insufficient stock for product ".concat(product.name, ". Available: ").concat(product.stock, ", Requested: ").concat(item.quantity));
                }
                _d.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, Address_1.default.create([__assign({}, result.data.shippingAddress)], { session: session })];
            case 7:
                address = _d.sent();
                return [4 /*yield*/, Order_1.default.create([{
                            userId: userId,
                            items: result.data.items,
                            addressId: address[0]._id,
                        }], { session: session })];
            case 8:
                order = _d.sent();
                _b = 0, _c = result.data.items;
                _d.label = 9;
            case 9:
                if (!(_b < _c.length)) return [3 /*break*/, 12];
                item = _c[_b];
                return [4 /*yield*/, Product_1.default.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } }, { session: session })];
            case 10:
                _d.sent();
                _d.label = 11;
            case 11:
                _b++;
                return [3 /*break*/, 9];
            case 12: 
            // Commit the transaction
            return [4 /*yield*/, session.commitTransaction()];
            case 13:
                // Commit the transaction
                _d.sent();
                return [4 /*yield*/, Order_1.default.findById(order[0]._id)
                        .populate({
                        path: "addressId",
                        model: "Address",
                    })];
            case 14:
                populatedOrder = _d.sent();
                res.status(201).json(populatedOrder);
                return [3 /*break*/, 18];
            case 15:
                error_1 = _d.sent();
                // If anything fails, abort the transaction
                return [4 /*yield*/, session.abortTransaction()];
            case 16:
                // If anything fails, abort the transaction
                _d.sent();
                next(error_1);
                return [3 /*break*/, 18];
            case 17:
                // End the session
                session.endSession();
                return [7 /*endfinally*/];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var getOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Order_1.default.findById(id).populate({
                        path: "addressId",
                        model: "Address",
                    })];
            case 1:
                order = _a.sent();
                if (!order) {
                    throw new not_found_error_1.default("Order not found");
                }
                res.status(200).json(order);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrder = getOrder;
var getMyOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var testUserId, orders, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                testUserId = "user_2sk2GwRWkOZcJ4gazgpLrRnKn56";
                return [4 /*yield*/, Order_1.default.find({
                        userId: testUserId,
                        paymentStatus: "PAID" // Only get paid orders
                    }).populate({
                        path: "addressId",
                        model: "Address",
                        select: "line_1 line_2 city state zip_code phone"
                    }).sort({ createdAt: -1 })];
            case 1:
                orders = _a.sent();
                console.log("Found ".concat(orders.length, " paid orders for test user"));
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error in getMyOrders:", error_3);
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMyOrders = getMyOrders;
//# sourceMappingURL=order.js.map