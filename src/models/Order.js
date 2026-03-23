import mongoose, { Schema } from "mongoose";

const OrderProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    products: {
      type: [OrderProductSchema],
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Packed", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
