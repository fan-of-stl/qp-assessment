import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import "./utils/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Grocery Booking API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
