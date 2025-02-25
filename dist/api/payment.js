"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
var express_1 = __importDefault(require("express"));
var payment_1 = require("../application/payment");
exports.paymentRouter = express_1.default.Router();
// Webhook doesn't need auth
exports.paymentRouter.route("/webhook").post(payment_1.handleWebhook);
// Protected route
exports.paymentRouter.post('/create-checkout-session', payment_1.createCheckoutSession);
exports.paymentRouter.get('/verify-payment', payment_1.verifyPayment);
//# sourceMappingURL=payment.js.map