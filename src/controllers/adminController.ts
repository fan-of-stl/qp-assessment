import { Request, Response } from "express";
import GroceryItem, { GroceryItemModel } from "../models/groceryItem";

export const addGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, inventory } = req.body;

    const groceryItem = new GroceryItem({
      name,
      price,
      inventory,
    });

    await groceryItem.save();

    res.json({ message: "Grocery item added successfully", groceryItem });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const viewGroceryItems = async (req: Request, res: Response) => {
  try {
    const groceryItems = await GroceryItem.find().lean();
    res.json(groceryItems);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await GroceryItem.findOneAndDelete({ _id: id });
    if (!deletedItem) {
      return res.status(404).json({ message: "Grocery item not found" });
    }
    res.json({ message: "Grocery item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, inventory } = req.body;

    await GroceryItem.findByIdAndUpdate(id, { name, price, inventory });

    res.json({ message: "Grocery item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const manageInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { inventory } = req.body;

    await GroceryItem.findByIdAndUpdate(id, { inventory });

    res.json({ message: "Inventory updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
