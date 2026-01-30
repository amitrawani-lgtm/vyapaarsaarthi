import mongoose,{Schema} from "mongoose"



const orderSchema = new mongoose.Schema({
  orderId: String,
  buyerPhone: Number,
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtPurchase: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "panding"
  },
  shopkeeper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);
export {Order};
