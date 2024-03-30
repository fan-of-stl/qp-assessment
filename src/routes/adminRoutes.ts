import express from "express";
import * as adminController from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.post("/grocery", adminController.addGroceryItem);
adminRoutes.get("/grocery", adminController.viewGroceryItems);
adminRoutes.delete("/grocery/:id", adminController.removeGroceryItem);
adminRoutes.put("/grocery/:id", adminController.updateGroceryItem);
adminRoutes.put("/grocery/:id/inventory", adminController.manageInventory);

export default adminRoutes;
