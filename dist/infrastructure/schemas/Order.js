"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var OrderProductSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
});
var ItemSchema = new mongoose_1.default.Schema({
    product: { type: OrderProductSchema, required: true },
    quantity: { type: Number, required: true },
});
var OrderSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    addressId: { type: String, required: true },
    items: {
        type: [ItemSchema],
        required: true,
    },
    paymentIntentId: { type: String, required: true },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID"],
        default: "PENDING",
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});
var Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map