import mongoose from "mongoose";

const PaymentProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String},
});

const ItemSchema = new mongoose.Schema({
  product: { type: PaymentProductSchema, required: true },
  quantity: { type: Number, required: true },
});

const PaymentSchema = new mongoose.Schema({
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

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
