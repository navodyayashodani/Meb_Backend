import mongoose from "mongoose";

const OrderProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String},
});

const ItemSchema = new mongoose.Schema({
  product: { type: OrderProductSchema, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
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
  
},
{
  timestamps: true // Adds createdAt and updatedAt fields
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;


