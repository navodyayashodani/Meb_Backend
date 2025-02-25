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
exports.verifyPayment = exports.createCheckoutSession = exports.handleWebhook = void 0;
var Order_1 = __importDefault(require("../infrastructure/schemas/Order"));
var stripe_1 = __importDefault(require("stripe"));
var zod_1 = require("zod");
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var Product_1 = __importDefault(require("../infrastructure/schemas/Product"));
var mongoose_1 = __importDefault(require("mongoose"));
var Address_1 = __importDefault(require("../infrastructure/schemas/Address"));
var mongodb_1 = require("mongodb");
var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia'
});
var ordersSchema = zod_1.z.object({
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
    paymentIntentId: zod_1.z.string(), // 🔹 Add this field
    paymentStatus: zod_1.z.enum(["PENDING", "PAID"]),
});
var handleWebhook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, data, session, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, type = _a.type, data = _a.data;
                if (!(type === "checkout.session.completed")) return [3 /*break*/, 4];
                session = data.object;
                if (!session.metadata || !session.metadata.orderId) {
                    console.error("⚠️ No order ID found in session metadata");
                    return [2 /*return*/, res.status(400).send()];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Order_1.default.findByIdAndUpdate(session.metadata.orderId, { paymentStatus: "PAID" })];
            case 2:
                _b.sent();
                console.log("✅ Order marked as PAID:", session.metadata.orderId);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("❌ Error updating order status:", error_1);
                return [2 /*return*/, res.status(500).send()];
            case 4:
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); };
exports.handleWebhook = handleWebhook;
var MAX_RETRIES = 3;
var createCheckoutSession = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var retryCount, session, result, _i, _a, item, product, address, order, _b, _c, item, lineItems, stripeSession, error_2;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                retryCount = 0;
                _e.label = 1;
            case 1:
                if (!(retryCount < MAX_RETRIES)) return [3 /*break*/, 20];
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 2:
                session = _e.sent();
                session.startTransaction();
                _e.label = 3;
            case 3:
                _e.trys.push([3, 16, 18, 19]);
                console.log("Received request body:", req.body);
                result = ordersSchema.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default("Invalid order data: ".concat(JSON.stringify(result.error.format())));
                }
                _i = 0, _a = result.data.items;
                _e.label = 4;
            case 4:
                if (!(_i < _a.length)) return [3 /*break*/, 7];
                item = _a[_i];
                return [4 /*yield*/, Product_1.default.findById(item.product._id).session(session)];
            case 5:
                product = _e.sent();
                if (!product) {
                    throw new validation_error_1.default("Product ".concat(item.product._id, " not found"));
                }
                if (product.stock < item.quantity) {
                    throw new validation_error_1.default("Insufficient stock for product ".concat(product.name, ". Available: ").concat(product.stock, ", Requested: ").concat(item.quantity));
                }
                _e.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [4 /*yield*/, Address_1.default.create([__assign({}, result.data.shippingAddress)], { session: session })];
            case 8:
                address = _e.sent();
                return [4 /*yield*/, Order_1.default.create([{
                            userId: 'user_2sk2GwRWkOZcJ4gazgpLrRnKn56', // Test user ID
                            items: result.data.items,
                            addressId: address[0]._id,
                        }], { session: session })];
            case 9:
                order = _e.sent();
                _b = 0, _c = result.data.items;
                _e.label = 10;
            case 10:
                if (!(_b < _c.length)) return [3 /*break*/, 13];
                item = _c[_b];
                return [4 /*yield*/, Product_1.default.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } }, { session: session })];
            case 11:
                _e.sent();
                _e.label = 12;
            case 12:
                _b++;
                return [3 /*break*/, 10];
            case 13:
                lineItems = result.data.items.map(function (item) { return ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.product.name,
                            images: ["https://fed-storefront-backend-harindi.onrender.com" + item.product.image], // Convert to absolute URL
                            description: item.product.description || 'No description available',
                        },
                        unit_amount: Math.round(parseFloat(item.product.price) * 100), // Convert price to cents
                    },
                    quantity: item.quantity,
                }); });
                return [4 /*yield*/, stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: lineItems,
                        mode: 'payment',
                        success_url: "".concat(process.env.FRONTEND_URL, "/shop/complete?order_id=").concat(order[0]._id), // Pass order ID
                        cancel_url: "/",
                        metadata: {
                            orderId: order[0]._id.toString(), // Store order ID in metadata
                        },
                    })];
            case 14:
                stripeSession = _e.sent();
                // Commit the transaction
                return [4 /*yield*/, session.commitTransaction()];
            case 15:
                // Commit the transaction
                _e.sent();
                // Return the session URL for redirect
                return [2 /*return*/, res.json({ url: stripeSession.url })];
            case 16:
                error_2 = _e.sent();
                // Abort the transaction on error
                return [4 /*yield*/, session.abortTransaction()];
            case 17:
                // Abort the transaction on error
                _e.sent();
                // Retry for transient errors
                if (error_2 instanceof mongodb_1.MongoServerError && ((_d = error_2.errorLabels) === null || _d === void 0 ? void 0 : _d.includes('TransientTransactionError')) && retryCount < MAX_RETRIES) {
                    retryCount++;
                    console.warn("Retrying transaction (attempt ".concat(retryCount, ")..."));
                    return [3 /*break*/, 1];
                }
                // Handle validation errors
                if (error_2 instanceof validation_error_1.default) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Validation failed',
                            error: error_2.message,
                        })];
                }
                // Handle other errors
                console.error('Checkout error:', error_2);
                return [2 /*return*/, res.status(500).json({
                        message: 'An error occurred while processing your details',
                        error: error_2 instanceof Error ? error_2.message : 'Unknown error',
                    })];
            case 18:
                // End the session
                session.endSession();
                return [7 /*endfinally*/];
            case 19: return [3 /*break*/, 1];
            case 20: 
            // If all retries fail
            return [2 /*return*/, res.status(500).json({
                    message: 'Failed to process your request after multiple attempts',
                })];
        }
    });
}); };
exports.createCheckoutSession = createCheckoutSession;
var verifyPayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, order, paymentIntent, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = req.query.order_id;
                if (!order_id) {
                    console.error("⚠️ Order ID is required");
                    return [2 /*return*/, res.status(400).json({ error: "Order ID is required" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Order_1.default.findById(order_id)];
            case 2:
                order = _a.sent();
                if (!order) {
                    console.error("⚠️ Order not found:", order_id);
                    return [2 /*return*/, res.status(404).json({ error: "Order not found" })];
                }
                if (order.paymentStatus === "PAID") {
                    console.log("✅ Payment already verified:", order_id);
                    return [2 /*return*/, res.json({ paymentStatus: "PAID" })];
                }
                return [4 /*yield*/, stripe.paymentIntents.retrieve(order.paymentIntentId)];
            case 3:
                paymentIntent = _a.sent();
                if (!(paymentIntent.status === "succeeded")) return [3 /*break*/, 5];
                return [4 /*yield*/, Order_1.default.findByIdAndUpdate(order_id, { paymentStatus: "PAID" })];
            case 4:
                _a.sent();
                console.log("✅ Order marked as PAID:", order_id);
                return [2 /*return*/, res.json({ paymentStatus: "PAID" })];
            case 5:
                console.warn("⚠️ Payment not completed:", order_id);
                return [2 /*return*/, res.json({ paymentStatus: "UNPAID" })];
            case 6:
                error_3 = _a.sent();
                console.error("❌ Error verifying payment:", error_3);
                return [2 /*return*/, res.status(500).json({ error: "Internal server error" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=payment.js.map