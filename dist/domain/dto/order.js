"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDTO = void 0;
var zod_1 = require("zod");
exports.CreateOrderDTO = zod_1.z.object({
    items: zod_1.z
        .object({
        product: zod_1.z.object({
            _id: zod_1.z.string(),
            name: zod_1.z.string(),
            price: zod_1.z.number(),
            image: zod_1.z.string(),
            description: zod_1.z.string(),
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
//# sourceMappingURL=order.js.map