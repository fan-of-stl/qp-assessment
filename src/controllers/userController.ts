import { Request, Response } from "express";
import UserOrder from "../models/userOrder";
import GroceryItem, { GroceryItemModel } from "../models/groceryItem";

export const viewGroceryItems = async (req: Request, res: Response) => {
  try {
    const groceryItems = await GroceryItem.find().lean();
    res.json(groceryItems);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const bookGroceryItems = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;

    let totalAmount = 0;
    for (const item of items) {
      const { itemId, quantity } = item;
      const groceryItem = await GroceryItem.findById(itemId);
      if (!groceryItem) {
        return res.status(400).json({ message: "Invalid item ID" });
      }
      totalAmount += groceryItem.price * quantity;

      await GroceryItem.findByIdAndUpdate(itemId, {
        $inc: { inventory: -quantity },
      });
    }

    const order = new UserOrder({
      userId,
      items,
      totalAmount,
    });

    await order.save();

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
