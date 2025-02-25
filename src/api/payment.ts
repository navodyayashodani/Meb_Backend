import express from 'express';
import { handleWebhook, createCheckoutSession, verifyPayment } from '../application/payment';

export const paymentRouter = express.Router();
// Webhook doesn't need auth
paymentRouter.route("/webhook").post(handleWebhook as any);

// Protected route
paymentRouter.post('/create-checkout-session', createCheckoutSession as any);

paymentRouter.get('/verify-payment', verifyPayment as any);
