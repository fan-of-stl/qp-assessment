import mongoose, { Schema, Document } from "mongoose";

export interface UserOrderModel extends Document {
  userId: string;
  items: { itemId: string; quantity: number }[];
  totalAmount: number;
  createdAt: Date;
}

const UserOrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      itemId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<UserOrderModel>("UserOrder", UserOrderSchema);
