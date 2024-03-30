import mongoose, { Schema, Document } from "mongoose";

export interface GroceryItemModel extends Document {
  name: string;
  price: number;
  inventory: number;
}

const GroceryItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true },
});

export default mongoose.model<GroceryItemModel>(
  "GroceryItem",
  GroceryItemSchema
);
