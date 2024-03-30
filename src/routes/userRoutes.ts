import express from "express";
import * as userController from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/grocery", userController.viewGroceryItems);
userRoutes.post("/order", userController.bookGroceryItems);

export default userRoutes;
